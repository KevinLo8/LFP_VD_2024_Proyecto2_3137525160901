const e = require("express");

class Operacion {
    constructor(operacion, nombre, valor1, valor2) {
        this.operacion = operacion;
        this.nombre = nombre;
        this.valor1 = valor1;
        this.valor2 = valor2;
    }

    getOperacion() {
        return this.operacion;
    }

    getNombre() {
        return this.nombre;
    }

    getValor1() {
        return this.valor1;
    }

    getValor2() {
        return this.valor2;
    }

    getResultado() {
        return this.resultado;
    }

    calcularResultado() {

        var num1, num2;

        if (typeof this.valor1 === 'object') {
            num1 = this.valor1.getResultado();
        } else {
            num1 = this.valor1;
        }

        if (typeof this.valor2 === 'object') {
            num2 = this.valor2.getResultado();
        } else {
            num2 = this.valor2;
        }

        switch (this.operacion) {
            case '"suma"':
                this.resultado = num1 + num2;
                break;
            case '"resta"':
                this.resultado = num1 - num2;
                break;
            case '"multiplicacion"':
                this.resultado = num1 * num2;
                break;
            case '"division"':
                this.resultado = num1 / num2;
                break;
            case '"potencia"':
                this.resultado = Math.pow(num1, num2);
                break;
            case '"raiz"':
                this.resultado = Math.pow(num1, 1 / num2);
                break;
            case '"inverso"':
                this.resultado = 1 / num1;
                break;
            case '"seno"':
                this.resultado = Math.sin(num1);
                break;
            case '"coseno"':
                this.resultado = Math.cos(num1);
                break;
            case '"tangente"':
                this.resultado = Math.tan(num1);
                break;
            case '"mod"':
                var dif = num1 / num2;
                dif = Math.floor(dif);
                this.resultado = num1 - (num2 * dif);
                break;
        }
    }
}

module.exports = Operacion;