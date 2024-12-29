const Operacion = require("../Operacion/Operacion");

class Datos {
    constructor() {
        this.operaciones = new Array;
        this.funciones = new Array;
    }

    getOperaciones() {
        return this.operaciones;
    }

    getFunciones() {    
        return this.funciones;
    }

    getConfiguracionLex() {
        return this.configuracionLex;
    }

    getConfiguracionParser() {
        return this.configuracionParser;
    }

    setConfiguracionLex(configuracion) {
        this.configuracionLex = configuracion;
    }

    setConfiguracionParser(configuracion) {
        this.configuracionParser = configuracion;
    }

    agregarOperacion(operacion) {
        this.operaciones.push(operacion);
    }

    agregarFuncion(funcion) {
        this.funciones.push(funcion);
    }
}
module.exports = Datos;