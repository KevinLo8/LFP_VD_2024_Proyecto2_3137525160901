const e = require('express');
const Token = require('../Token/Token');
const Operacion = require('../Operacion/Operacion');
const Configuracion = require('../Configuracion/Configuracion');
const Funcion = require('../Funcion/Funcion');

class AnalizadorSintactico {

    constructor(erroresLexicos, datosIn) {
        errores = erroresLexicos;
        datos = datosIn;
    }

    analizarTokens(tokens, erroresLexicos, datosIn) {
        errores = erroresLexicos;
        datos = datosIn;

        tieneOperaciones = false;
        tieneConfiguracionLex = false;
        tieneConfiguracionParser = false;

        numero = -1;

        do {

            estado = 0;

            numero++;
            token = tokens[numero];

            if (token.getTipo() == 'Palabra Reservada') {
                
                if (token.getLexema() == 'Operaciones') {
                    estado = 1;
                } else {
                    if (token.getLexema() == 'ConfiguracionesLex') {
                        estado = 2;
                    } else if (token.getLexema() == 'ConfiguracionesParser') {
                        estado = 3;
                    }
                }

                numero++;
                token = tokens[numero];
                if (token.getTipo() != 'Asignación') {
                    guardarError(token);
                }

                numero++;
                token = tokens[numero];
                if (token.getTipo() != 'Agrupación') {
                    guardarError(token);
                }

                revisarDeclaracion(tokens);

                numero++;
                token = tokens[numero];
                if (token.getTipo() != 'Agrupación') {
                    guardarError(token);
                }
            } else if (token.getTipo() == 'Palabra Función') {
                
                if (token.getLexema() == 'imprimir') {
                    estado = 1;
                } else if (token.getLexema() == 'conteo') {
                    estado = 2;
                } else if (token.getLexema() == 'generarReporte') {
                    estado = 3;
                } else {
                    estado = 4;
                }

                numero++;
                token = tokens[numero];            
                if (token.getTipo() != 'Agrupación') {
                    guardarError(token);                    
                }

                revisarDeclaracionFuncion(tokens);

                numero++;
                token = tokens[numero];
                if (token.getTipo() != 'Agrupación') {
                    guardarError(token);
                }

                if (estado == 1) {
                    tieneOperaciones = true;
                } else if (estado == 2) {
                    tieneConfiguracionLex = true;
                } else if (estado == 3) {
                    tieneConfiguracionParser = true;
                }
            } else {
                guardarError(token);
            }

        } while (numero < tokens.length - 1);
    }

    getErrores() {
        return errores;
    }

}

let errores;
let numero;
let estado;
let token;
let datos;

var tieneOperaciones;
var tieneConfiguracionLex;
var tieneConfiguracionParser;

function revisarDeclaracion(tokens) {
    if (estado == 1) {
        revisarDeclaracionOperaciones(tokens);
    } else if (estado == 2 || estado == 3) {
        revisarDeclaracionConfiguracion(tokens);
    }

    while (tokens[numero + 1].getTipo() == 'Signo') {

        numero++;

        if (estado == 1) {
            revisarDeclaracionOperaciones(tokens);
        } else if (estado == 2 || estado == 3) {
            revisarDeclaracionConfiguracion(tokens);
        }
    }

}

function revisarDeclaracionOperaciones(tokens) {
    let tipo;
    let nombre;
    let valor1;
    let valor2;

    numero++;
    token = tokens[numero];
    if (token.getTipo() != 'Agrupación') {
        guardarError(token);
    }

    do {

        if (tokens[numero + 1].getTipo() == 'Signo') {
            numero++;
        }

        numero++;
        token = tokens[numero];

        if (token.getLexema() == '"operacion"') {
            estado = 1;
        } else if (token.getLexema() == '"nombre"') { 
            estado = 2;
        } else if (token.getLexema() == '"valor1"') {
            estado = 3;
        } else if (token.getLexema() == '"valor2"') {
            estado = 4;
        }

        if (token.getTipo() != 'Cadena Reservada') {
            guardarError(token);
        }

        numero++;
        token = tokens[numero];
        if (token.getTipo() != 'Asignación') {
            guardarError(token);
        }

        if (estado == 1) {
            numero++;
            token = tokens[numero];
            if (token.getTipo() != 'Operación') {
                guardarError(token);
            } else {
                tipo = token.getLexema();
            }
        } else if (estado == 2) {
            numero++;
            token = tokens[numero];
            if (token.getTipo() != 'Cadena') {
                guardarError(token);
            } else {
                nombre = token.getLexema();
            }
        } else if (estado == 3 || estado == 4) {
            numero++;
            token = tokens[numero];
            if (token.getTipo() == 'Agrupación') {
                numero--;
                let subOperacion = revisarSubOperacion(tokens);
                if (estado == 3) {
                    valor1 = subOperacion;
                } else if (estado == 4) {
                    valor2 = subOperacion;
                }
            } else if (token.getTipo() != 'Numero') {
                guardarError(token);
            } else {
                if (estado == 3) {
                    valor1 = parseInt(token.getLexema());
                } else if (estado == 4) {
                    valor2 = parseInt(token.getLexema());
                }
            }
        }
    } while (tokens[numero + 1].getTipo() == 'Signo');
    
    numero++;
    token = tokens[numero];
    if (token.getTipo() != 'Agrupación') {
        guardarError(token);
    }

    estado = 1;

    operacion = new Operacion(tipo, nombre, valor1, valor2);
    operacion.calcularResultado();
    datos.agregarOperacion(operacion);
}

function revisarSubOperacion(tokens) {
    let tipo;
    let valor1;
    let valor2;

    const estadoInicial = estado;

    numero++;
    token = tokens[numero];
    if (token.getTipo() != 'Agrupación') {
        guardarError(token);
    }

    numero++;
    token = tokens[numero];
    if (token.getTipo() != 'Agrupación') {
        guardarError(token);
    }

    do {

        if (tokens[numero + 1].getTipo() == 'Signo') {
            numero++;
        }
        
        numero++;
        token = tokens[numero];
        if (token.getLexema() == '"operacion"') {
            estado = 1;
        } else if (token.getLexema() == '"valor1"') {
            estado = 3;
        } else if (token.getLexema() == '"valor2"') {
            estado = 4;
        }

        if (token.getTipo() != 'Cadena Reservada') {
            guardarError(token);
        }

        numero++;
        token = tokens[numero];
        if (token.getTipo() != 'Asignación') {
            guardarError(token);
        }

        numero++;
        token = tokens[numero];
    if (estado == 1) {
            if (token.getTipo() != 'Operación') {
                guardarError(token);
            } else {
                tipo = token.getLexema();
            }
        } else if (estado == 3 || estado == 4) {
            if (token.getTipo() == 'Agrupación') {
                numero--;
                let subOperacion = revisarSubOperacion(tokens);
                if (estado == 3) {
                    valor1 = subOperacion;
                } else if (estado == 4) {
                    valor2 = subOperacion;
                }
            } else if (token.getTipo() != 'Numero') {
                guardarError(token);
            } else {
                if (estado == 3) {
                    valor1 = parseInt(token.getLexema());
                } else if (estado == 4) {
                    valor2 = parseInt(token.getLexema());
                }
            }
        }
    } while (tokens[numero + 1].getTipo() == 'Signo');

    numero++;
    token = tokens[numero];
    if (token.getTipo() != 'Agrupación') {
        guardarError(token);
    }

    numero++;
    token = tokens[numero];
    if (token.getTipo() != 'Agrupación') {
        guardarError(token);
    }

    estado = estadoInicial;

    let operacion = new Operacion(tipo, null, valor1, valor2);
    operacion.calcularResultado();
    return operacion;
}

function revisarDeclaracionConfiguracion(tokens) {
    
    const estadoInicial = estado;

    let configuracion = new Configuracion();

    do {
        if (tokens[numero + 1].getTipo() == 'Signo') {
            numero++;
        }

        numero++;
        token = tokens[numero];
        if (token.getLexema() == 'fondo') {
            estado = 1;
        } else if (token.getLexema() == 'fuente') {
            estado = 2;
        } else if (token.getLexema() == 'forma') {
            estado = 3;
        }else if (token.getLexema() == 'tipoFuente') {
            estado = 4;
        }

        if (token.getTipo() != 'Palabra Configuración') {
            guardarError(token);
        }

        numero++;
        token = tokens[numero];
        if (token.getTipo() != 'Asignación') {
            guardarError(token);
        }

        numero++;
        token = tokens[numero];
        if (estado == 1 || estado == 2) {
            if (token.getTipo() != 'Cadena') {
                guardarError(token);
            } else {
                if (estado == 1) {
                    configuracion.setFondo(token.getLexema());
                } else if (estado == 2) {
                    configuracion.setFuente(token.getLexema());
                }
            }
        } else if (estado == 3) {
            if (token.getTipo() != 'Forma') {
                guardarError(token);
            } else {
                configuracion.setForma(token.getLexema());
            }
        } else if (estado == 4) {
            if (token.getTipo() != 'Tipo Fuente') {
                guardarError(token);
            } else {
                configuracion.setTipoFuente(token.getLexema());
            }
        }

    } while (tokens[numero + 1].getTipo() == 'Signo');

    estado = estadoInicial;

    if (estado == 2) {
        datos.setConfiguracionLex(configuracion);
    } else if (estado == 3) {
        datos.setConfiguracionParser(configuracion);
    }
}

function revisarDeclaracionFuncion(tokens) {
    switch (estado) {
        case 1:
            revisarFuncionImprimir(tokens);
            break;
        case 2:
            let funcion = new Funcion('conteo', null, null);
            datos.agregarFuncion(funcion);
            break
        case 3:
            revisarFuncionGenerarReporte(tokens);
            break;
        case 4:
            revisarFuncionCalculo(tokens);
            break;
    }
}

function revisarFuncionImprimir(tokens) {
    numero++;
    token = tokens[numero];
    if (token.getTipo() != 'Cadena') {
        guardarError(token);
    }

    let funcion = new Funcion('imprimir', token.getLexema(), null);
    datos.agregarFuncion(funcion);
}

function revisarFuncionGenerarReporte(tokens) {

    var param1, param2;

    numero++;
    token = tokens[numero];
    if (token.getTipo() == 'Cadena Reporte') {
        param1 = token.getLexema();

        numero++;
        token = tokens[numero];
        if (token.getTipo() == 'Signo') {
            
            numero++;
            token = tokens[numero];
            if (token.getTipo() != 'Cadena') {
                guardarError(token);
            } else {
                param2 = token.getLexema();
            }
    
        } else {
            numero--;
        }
    
    } else if (token.getTipo() == 'Agrupación') {
        numero--;

        param1 = 'todos';

    } else {
        guardarError(token);
    }

    
    let funcion = new Funcion('generarReporte', param1, param2);
    datos.agregarFuncion(funcion);
}

function revisarFuncionCalculo(tokens) {
    let calculo = tokens[numero - 1].getLexema();

    numero++;
    token = tokens[numero];
    if (token.getTipo() != 'Operación') {
        guardarError(token);
    }

    let funcion = new Funcion(calculo, token.getLexema(), null);
    datos.agregarFuncion(funcion);
}

function guardarError (token) {
    let error = new Token(token.getLexema(), "Error Sintactico", token.getColumna(), token.getFila());
    errores.push(error);
}

module.exports = AnalizadorSintactico;