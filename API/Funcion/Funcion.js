class Funcion {
    constructor(tipo, param1, param2) {
        this.tipo = tipo;
        this.param1 = param1;
        this.param2 = param2;
    }

    getTipo() {
        return this.tipo;
    }

    getParam1() {
        return this.param1;
    }

    getParam2() {
        return this.param2;
    }
}

module.exports = Funcion;