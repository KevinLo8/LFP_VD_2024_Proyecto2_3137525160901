class Configuracion {

    getFondo() {
        return fondo;
    }

    setFondo(fondo) {
        this.fondo = fondo;
    }   

    getFuente() {
        return fuente;
    }

    setFuente(fuente) {
        this.fuente = fuente;
    }

    getForma() {
        return forma;
    }

    setForma(forma) {
        this.forma = forma;
    }

    getTipoFuente() {
        return tipoFuente;
    }

    setTipoFuente(tipoFuente) {
        this.tipoFuente = tipoFuente;
    }
    
}

let fondo;
let fuente;
let forma;
let tipoFuente;

module.exports = Configuracion;