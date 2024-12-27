class AnalizadorMatematico {

    calcularPromedio(operaciones, tipo) {
        valores = new Array();

        extraerYOrdenarValores(operaciones, tipo);

        if (valores.length == 0) {
            return 0;
        }

        let suma = 0;
        for (let i = 0; i < valores.length; i++) {
            suma += valores[i];
        }

        return suma / valores.length
    }

    calcularMax(operaciones, tipo) {
        valores = new Array();

        extraerYOrdenarValores(operaciones, tipo);

        if (valores.length == 0) {
            return 0;
        }

        return valores[0];
    }

    calcularMin(operaciones, tipo) {
        valores = new Array();

        extraerYOrdenarValores(operaciones, tipo);

        if (valores.length == 0) {
            return 0;
        }
        
        return valores[valores.length - 1];
    }

}

let valores;

function extraerYOrdenarValores(operaciones, tipo) {
    for (let i = 0; i < operaciones.length; i++) {
        let operacion = operaciones[i];
        extraerValor(operacion, tipo);
    }

    
    return valores.sort((a, b) => a - b);
}

function extraerValor(operacion, tipo) {
    if (operacion.getOperacion() == tipo) {
        valores.push(operacion.getResultado());
    }
    if (typeof operacion.getValor1() == 'object') {
        extraerValor(operacion.getValor1(), tipo);
    }
    if (typeof operacion.getValor2() == 'object') {
        extraerValor(operacion.getValor2(), tipo);
    }
}
module.exports = AnalizadorMatematico;