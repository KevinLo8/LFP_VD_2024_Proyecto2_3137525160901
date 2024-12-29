const Token = require("../Token/Token");

class AnalizadorLexico {
    constructor() {
        tokens = new Array;
        errores = new Array;
        comentarios = new Array;
    }
    
    analizarTexto(texto) {
        tokens = new Array;
        errores = new Array;

        espacio = 0;
        columna = 1;
        fila = 1;

        do {
            charInicial = texto.charAt(espacio);

            if (charInicial.match(" ")) {

                columna++;
                espacio++;
            } else if(charInicial.match("\n")) {

                fila++;
                columna = 1;
                espacio++;
            } else if(esAgrupacion(charInicial)) {
                
                guardarToken(charInicial, 'Agrupación');
                columna++;
                espacio++;
            } else if(esAsignacion(charInicial)) {

                guardarToken(charInicial, 'Asignación');
                columna++;
                espacio++;
            } else if(esSigno(charInicial)) {

                guardarToken(charInicial, 'Signo');
                columna++;
                espacio++;
            } else if(esNumero(charInicial)) {

                const palabra = extraerNumero(texto);
                guardarToken(palabra, 'Numero');
                columna += palabra.length;
            } else if(esLetra(charInicial)) {

                const palabra = extraerPalabra(texto);

                if (esPalabraReservada(palabra)) {
                    guardarToken(palabra, 'Palabra Reservada');
                } else if (esPalabraFuncion(palabra)) {
                    guardarToken(palabra, 'Palabra Función');
                } else if (esPalabraConfiguracion(palabra)) {
                    guardarToken(palabra, 'Palabra Configuración');
                } else {
                    guardarError(palabra);
                }
                columna += palabra.length;
            } else if(charInicial.charCodeAt(0) == 47) {

                let char2 = texto.charAt(espacio + 1);
                let palabra = '';

                if (char2.charCodeAt(0) == 47) {
                    palabra = extraerComentarioUnaLinea(texto);
                    guardarComentario(palabra);
                } else if (char2.charCodeAt(0) == 42) {
                    palabra = extraerComentarioMultiLinea(texto);
                    guardarComentario(palabra);
                } else {
                    guardarError(charInicial);
                    palabra = charInicial;
                }

                columna += palabra.length;
            } else if(charInicial.charCodeAt(0) == 34) {
                const palabra = extraerCadena(texto);

                if (esCadenaReservada(palabra)) {
                    guardarToken(palabra, 'Cadena Reservada');
                } else if(esCadenaReporte(palabra)) {
                    guardarToken(palabra, 'Cadena Reporte');
                } else if(esOperacion(palabra)) {
                    guardarToken(palabra, 'Operación');
                } else if(esForma(palabra)) {
                    guardarToken(palabra, 'Forma');
                } else if(esTipoFuente(palabra)) {
                    guardarToken(palabra, 'Tipo Fuente');
                } else if(esColor(palabra)) {
                    guardarToken(palabra, 'Color');
                } else {
                    guardarToken(palabra, 'Cadena');
                }
                columna += palabra.length;

            } else {
                guardarError(charInicial);
                columna++;
                espacio++;
            }

        } while (espacio < texto.length);

        console.log();
        console.log('Se a analizado el texto correctamente');
        console.log();
    }

    getTokens() {
        return tokens;
    }

    getErrores() {
        return errores;
    }

}

const palabrasReservadas = ['Operaciones','ConfiguracionesLex','ConfiguracionesParser'];
const palabrasFunciones = ['imprimir','conteo','promedio','max','min','generarReporte'];
const palabrasConfiguraciones = ['fondo','fuente','forma','tipoFuente'];
const cadenasReservadas = ['"operacion"','"nombre"','"valor1"','"valor2"'];
const cadenasReportes = ['"tokens"','"errores"','"arbol"'];
const operaciones = ['"suma"','"resta"','"multiplicacion"','"division"','"potencia"','"raiz"','"inverso"','"seno"','"coseno"','"tangente"','"mod"'];
const forma = ['"circle"','"diamond"','"triangle"','"box"'];
const tipoFuente = ['"Arial"','"Times-Roman"'];

let tokens;
let errores;
let comentarios;
let espacio;
let columna;
let fila;
let charInicial;

function esAgrupacion(palabra) {
        if (palabra.charCodeAt(0) == 123 || palabra.charCodeAt(0) == 125) {
            return true;
        } else if (palabra.charCodeAt(0) == 91 || palabra.charCodeAt(0) == 93) {
            return true;
        } else if (palabra.charCodeAt(0) == 40 || palabra.charCodeAt(0) == 41) {
            return true;
        } else {
            return false;
        }
}

function esAsignacion(palabra) {
    return palabra.charCodeAt(0) == 58 || palabra.charCodeAt(0) == 61;
}

function esSigno(palabra) {
    return palabra.charCodeAt(0) == 44;
}

function esPalabraReservada(palabra) {
    for (let index = 0; index < palabrasReservadas.length; index++) {
        if (palabra.match(palabrasReservadas[index])) {
            return true;
        }
    }
    return false;
}

function esPalabraFuncion(palabra) {
    for (let index = 0; index < palabrasFunciones.length; index++) {
        if (palabra.match(palabrasFunciones[index])) {
            return true;
        }
    }
    return false;
}

function esPalabraConfiguracion(palabra) {
    for (let index = 0; index < palabrasConfiguraciones.length; index++) {
        if (palabra.match(palabrasConfiguraciones[index])) {
            return true;
        }
    }
    return false;
}

function esCadenaReservada(palabra) {
    for (let index = 0; index < cadenasReservadas.length; index++) {
        if (palabra.match(cadenasReservadas[index])) {
            return true;
        }
    }
    return false;
}

function esCadenaReporte(palabra) {
    for (let index = 0; index < cadenasReportes.length; index++) {
        if (palabra.match(cadenasReportes[index])) {
            return true;
        }
    }
    return false;
}

function esOperacion(palabra) {
    for (let index = 0; index < operaciones.length; index++) {
        if (palabra.match(operaciones[index])) {
            return true;
        }
    }
    return false;
}

function esForma(palabra) {
    for (let index = 0; index < forma.length; index++) {
        if (palabra.match(forma[index])) {
            return true;
        }
    }
    return false;
}

function esTipoFuente(palabra) {
    for (let index = 0; index < tipoFuente.length; index++) {
        if (palabra.match(tipoFuente[index])) {
            return true;
        }
    }
    return false;
}

function esColor(palabra) {
    if (!palabra.charAt(0).match("\"") || !palabra.charAt(palabra.length - 1).match("\"")) {
        return false;
    }
    if (!palabra.charAt(1).match("#")) {
        return false;
    }
    for (let index = 2; index < 8; index++){
        if (!esNumeroHexadecimal(palabra.charAt(index))) {
            return false;
        }
    }
    return true;
}

function esLetra(palabra) {
    if (palabra.charCodeAt(0) > 64 && palabra.charCodeAt(0) < 91) {
        return true;
    }
    if (palabra.charCodeAt(0) > 96 && palabra.charCodeAt(0) < 123) {
        return true;
    }
    if (palabra.charCodeAt(0) == 130 || (palabra.charCodeAt(0) > 159 && palabra.charCodeAt(0) < 164) ) {
        return true;
    }
    if (palabra.charCodeAt(0) == 181 || palabra.charCodeAt(0) == 144 || palabra.charCodeAt(0) == 214 || palabra.charCodeAt(0) == 224 || palabra.charCodeAt(0) == 233) {
        return true;
    }
    return false;
}

function esNumero(palabra) {
    if (palabra.charCodeAt(0) > 47 && palabra.charCodeAt(0) < 58) {
        return true;
    }
    return false;
}

function esNumeroHexadecimal(palabra) {
    if (palabra.charCodeAt(0) > 47 && palabra.charCodeAt(0) < 58) {
        return true;
    }
    if (palabra.charCodeAt(0) > 96 && palabra.charCodeAt(0) < 103) {
        return true;
    }
    return false;
}

function extraerPalabra(texto) {
    let caracter;
    let palabra = '';

    caracter = texto.charAt(espacio);
    do {
        palabra = palabra.concat(caracter);
        espacio++;
        caracter = texto.charAt(espacio);
    } while (esLetra(caracter));

    return palabra;
}

function extraerCadena(texto) {
    let caracter;
    let palabra = '';

    caracter = texto.charAt(espacio);
    palabra = palabra.concat(caracter);
    espacio++;

    do {
        caracter = texto.charAt(espacio);
        palabra = palabra.concat(caracter);
        espacio++;
    } while (caracter.charCodeAt(0) != 34 && caracter.charCodeAt(0) != 10);

    return palabra;
}

function extraerNumero(texto) {
    let caracter = texto.charAt(espacio);
    let palabra = '';

    do {
        palabra = palabra.concat(caracter);
        espacio++;
        caracter = texto.charAt(espacio);
    } while (esNumero(caracter) || caracter.charCodeAt(0) == 46);

    return palabra;
}

function extraerComentarioUnaLinea(texto) {
    let caracter = texto.charAt(espacio);
    let palabra = '';

    do {
        palabra = palabra.concat(caracter);
        espacio++;
        caracter = texto.charAt(espacio);
    } while (!caracter.match('\n'));

    return palabra;
}

function extraerComentarioMultiLinea(texto) {
    let caracter = texto.charAt(espacio);
    let palabra = '';

    do {
        palabra = palabra.concat(caracter);
        espacio++;
        caracter = texto.charAt(espacio);
    } while (!(caracter.charCodeAt(0) == 42 && texto.charAt(espacio + 1).charCodeAt(0) == 47));

    palabra = palabra.concat(caracter);
    espacio++;
    caracter = texto.charAt(espacio);
    palabra = palabra.concat(caracter);
    espacio++;

    return palabra;
}

function guardarToken(palabra, tipo){
    let token = new Token(palabra, tipo, columna, fila);
    tokens.push(token);
}

function guardarError(palabra){
    let token = new Token(palabra, "Error Léxico", columna, fila);
    errores.push(token);
}

function guardarComentario(palabra){
    let token = new Token(palabra, 'Comentario', columna, fila);
    comentarios.push(token);
}

module.exports = AnalizadorLexico;