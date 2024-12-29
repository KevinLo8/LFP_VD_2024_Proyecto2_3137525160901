const fs = require('fs');

class GeneradorDeJson {

    generarReporteErrores(errores) {
        let texto = String('');
        texto = texto.concat('{\n');
        texto = texto.concat('  "errores": [\n');

        
        if (errores.length == 0) {
            texto = texto.concat('      "No Se Encontraron Errores"\n');
        } else {
            for (let index = 0; index < errores.length; index++) {
                let error = errores[index];
    
                texto = texto.concat('      {\n');
                texto = texto.concat('          "No.": ' + (index + 1) + ',\n');
                texto = texto.concat('          "descripción": {\n');
                texto = texto.concat('              "lexema": "' + error.getLexema() + '",\n');
                texto = texto.concat('              "tipo": "' + error.getTipo() + '",\n');
                texto = texto.concat('              "fila": ' + error.getFila() + ',\n');
                texto = texto.concat('              "columna": ' + error.getColumna() + '\n');
                texto = texto.concat('          }\n');
                if (index == errores.length - 1) {
                    texto = texto.concat('      }\n');
                } else {
                    texto = texto.concat('      },\n');
                }
            }
        }

        texto = texto.concat('  ]\n');
        texto = texto.concat('}\n');

        fs.writeFile('reporte-errores.Json', texto, (error) => {
            if (error) {
                console.log('Error al generar El Reporte Json');
            } else {
                console.log('Archivo de errores generado correctamente');
            }
        })
    }
}

module.exports = GeneradorDeJson;