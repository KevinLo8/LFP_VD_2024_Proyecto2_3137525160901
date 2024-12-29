var util = require('util'),
    graphviz = require('graphviz');
const fs = require('fs');
const e = require('express');
const { exec } = require('child_process');

class GeneradorDeDiagrama {

    generarDiagrama(operaciones, configuracion) {

        fondo = configuracion.getFondo().substring(1, configuracion.getFondo().length - 1);
        fuente = configuracion.getFuente().substring(1, configuracion.getFuente().length - 1);
        forma = configuracion.getForma().substring(1, configuracion.getForma().length - 1);
        tipoFuente = configuracion.getTipoFuente().substring(1, configuracion.getTipoFuente().length - 1);

        var g = graphviz.digraph("G");
        i = 1;

        operaciones.forEach(element => {
            crearNodos(g, element);
        });
        
        fs.writeFile('diagrama.dot', g.to_dot(), (err) => {
            if (err) throw err;
            exec('dot -Tpng diagrama.dot -o diagrama.png', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
    }
}

function crearNodos(g, operacion) {
    
    var nombreOp = operacion.getOperacion().substring(1, operacion.getOperacion().length - 1);
    var label = nombreOp + "\n" + operacion.getResultado();

    var nombreNo = operacion.getNombre().substring(1, operacion.getNombre().length - 1);
    var n = g.addNode( nombreNo, { "label" : label ,"fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma, "fontname" : tipoFuente} );

    if (typeof operacion.getValor1() == 'object') {
        crearSubNodos(g, n, operacion.getValor1());
    } else {
        var nl = g.addNode(i, { "label" : operacion.getValor1(), "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma, "fontname" : tipoFuente} );
        var e1 = g.addEdge(n, nl);
        i++;
    }

    if (typeof operacion.getValor2() == 'object') {
        crearSubNodos(g, n, operacion.getValor2());
    } else if (typeof operacion.getValor2() == 'undefined') {

    } else {
        var nr = g.addNode(i, { "label" : operacion.getValor2(), "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma, "fontname" : tipoFuente} );
        var e2 = g.addEdge(n, nr);
        i++;
    }

    g.getNode("po");

}

function crearSubNodos(g, n, operacion) {
    
    var nombreOp = operacion.getOperacion().substring(1, operacion.getOperacion().length - 1);
    var label = nombreOp + "\n" + operacion.getResultado();
    var s = g.addNode(i, { "label" : label, "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma, "fontname" : tipoFuente} );
    i++;

    if (typeof operacion.getValor1() == 'object') {
        crearSubNodos(g, s, operacion.getValor1());
    } else {
        var sl = g.addNode(i, { "label" : operacion.getValor1(), "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma, "fontname" : tipoFuente} );
        var es1 = g.addEdge(s, sl);
        i++;
    }

    if (typeof operacion.getValor2() == 'object') {
        crearSubNodos(g, s, operacion.getValor2());
    } else if (typeof operacion.getValor2() == 'undefined') {

    } else {
        var sr = g.addNode(i, { "label" : operacion.getValor2(), "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma, "fontname" : tipoFuente} );
        var es2 = g.addEdge(s, sr);
        i++;
    }

    g.addEdge(n, s);
}

let i;
let fondo, fuente, forma, tipoFuente;

module.exports = GeneradorDeDiagrama;