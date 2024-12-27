class Token {
    constructor(lexema, tipo, columna, fila) {
        this.lexema = lexema;
        this.tipo = tipo;
        this.columna = columna;
        this.fila = fila;
    }

    getLexema() {
        return this.lexema;
    }

    getTipo() {
        return this.tipo;
    }

    getColumna() {
        return this.columna;
    }

    getFila() {
        return this.fila;
    }
}

module.exports = Token;