const readline = require('readline');
const express = require('express');
const cors = require('cors');

const AnalizadorLexico = require('./AnalizadorLexico/AnalizadorLexico');
const AnalizadorSintactico = require('./AnalizadorSintactico/AnalizadorSintactico');
const AnalizadorMatematico = require('./AnalizadorMatematico/AnalizadorMatematico');
const GeneradorDeHTML = require('./GeneradorDeHTML/GeneradorDeHTML');
const GeneradorDeDiagrama = require('./GeneradorDeDiagrama/GeneradorDeDiagrama');
const Datos = require('./Datos/Datos');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const app = express();
app.use(express.text());

app.use(cors());

app.post('/Analizar', (req, res) => {
    consola = '';
    try {
        
        datos = new Datos();

        const texto = req.body;
        if (!texto) {
            res.status(400).json('No se ha ingresado ningun texto');
        }

        anLex.analizarTexto(texto);
        anSin.analizarTokens(anLex.getTokens(), anLex.getErrores(), datos);

        if (anSin.getErrores().length == 0) {
            genGrap.generarDiagrama(datos.getOperaciones(), datos.getConfiguracionLex());    
        }

        analizarFunciones();

        res.status(201).json({tokens: anLex.getTokens(), errores: anSin.getErrores() , textoConsola: consola});
    } catch (error) {
        res.status(500).json('Error al analizar el texto');
    }
});

function analizarFunciones() {
    for (let i = 0; i < datos.getFunciones().length; i++) {
        let funcion = datos.getFunciones()[i];
        switch (funcion.getTipo()) {
            case 'imprimir':
                console.log(funcion.getParam1());
                consola += funcion.getParam1() + '\n';
                break;
            case 'conteo':
                console.log(datos.getOperaciones().length);
                consola += datos.getOperaciones().length + '\n';            
                break;
            case 'promedio':
                var promedio = anMat.calcularPromedio(datos.getOperaciones(), funcion.getParam1());
                console.log(promedio);
                consola += promedio + '\n';
                break;
            case 'max':
                var max = anMat.calcularMax(datos.getOperaciones(), funcion.getParam1());
                console.log(max);
                consola += max + '\n';
                break;
            case 'min':
                var min = anMat.calcularMin(datos.getOperaciones(), funcion.getParam1());
                console.log(min);
                consola += min + '\n';
                break;
            case 'generarReporte':
                switch (funcion.getParam1()) {
                    case '"tokens"':
                        genHTML.generarReporteTokens(anLex.getTokens(), funcion.getParam2());
                        break;
                    case '"errores"':
                        genHTML.generarReporteErrores(anSin.getErrores(), funcion.getParam2());
                        break;
                    case '"arbol"':
                        //genGrap.generarDiagramaSintactico();
                        break;
                    case 'todos':
                        genHTML.generarReporteTokens(anLex.getTokens(), null);
                        genHTML.generarReporteErrores(anSin.getErrores(), null);
                        //genGrap.generarDiagramaSintactico();
                        break;
                }
                break;
        }
    }
}

const server = 3000;
app.listen(server, () => {
    console.log(`Servidor iniciado en http://localhost:${server}`);
});

let anLex = new AnalizadorLexico();
let anSin = new AnalizadorSintactico();
let anMat = new AnalizadorMatematico();
let genHTML = new GeneradorDeHTML();
let genGrap = new GeneradorDeDiagrama();

let datos;
let consola;