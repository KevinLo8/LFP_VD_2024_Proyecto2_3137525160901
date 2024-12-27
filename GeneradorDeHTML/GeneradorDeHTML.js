const fs = require('fs');

class GeneradorDeHTML {

    generarReporteTokens(tokens, nombre) {
        let texto = String('');
        texto = texto.concat('<html>\n');
        texto = texto.concat('    <head>\n');
        texto = texto.concat('        <meta charset="UTF-8">\n');
        texto = texto.concat('        <title>Reporte de Tokens Encontrados</title>\n');
        texto = texto.concat('    </head>\n');
        texto = texto.concat('    <body style="font-family: Arial; padding: 20px; text-align: center; background-color: #31cbd2;">\n');
        texto = texto.concat('        <h1>Reporte de Tokens Encontrados</h1>\n');
        texto = texto.concat('        <h2>Tokens encontrados:</h2>\n');
        texto = texto.concat('        <table border="1" style="width: 100%; text-align: center;">\n');
        texto = texto.concat('            <tr>\n');
        texto = texto.concat('                <th>#</th>\n');
        texto = texto.concat('                <th>Token</th>\n');
        texto = texto.concat('                <th>Lexema</th>\n');
        texto = texto.concat('                <th>Fila</th>\n');
        texto = texto.concat('                <th>Columna</th>\n');
        texto = texto.concat('            </tr>\n');
        texto = texto.concat('\n');

        if (tokens.length == 0) {
            texto = texto.concat('        </table>\n');
            texto = texto.concat('        <h2>No Se Encontraron Tokens</h2>\n');
        } else {
            for (let index = 0; index < tokens.length; index++) {
                let token = tokens[index];
    
                texto = texto.concat('            <tr>\n');
                texto = texto.concat('                <td>' + (index + 1) + '</td>\n');
                texto = texto.concat('                <td>' + token.getTipo() + '</td>\n');
                texto = texto.concat('                <td>' + token.getLexema() + '</td>\n');
                texto = texto.concat('                <td>' + token.getFila() + '</td>\n');
                texto = texto.concat('                <td>' + token.getColumna() + '</td>\n');
                texto = texto.concat('            </tr>\n');
                texto = texto.concat('\n');
        
            }
    
            texto = texto.concat('        </table>\n');    
        }

        texto = texto.concat('    </body>\n');
        texto = texto.concat('</html>\n');

        if(nombre != null) {
            fs.writeFile(nombre + '.html', texto, (error) => {
                if (error) {
                    console.log('Error al generar El Reporte HTML');
                } else {
                    console.log('Reporte HTML generado correctamente');
                }
            })
        } else {
            fs.writeFile('201831605_tokens.html', texto, (error) => {
                if (error) {
                    console.log('Error al generar El Reporte HTML');
                } else {
                    console.log('Reporte HTML generado correctamente');
                }
            })
        }    
    }


    generarReporteErrores(errores, nombre) {
        let texto = String('');
        texto = texto.concat('<html>\n');
        texto = texto.concat('    <head>\n');
        texto = texto.concat('        <meta charset="UTF-8">\n');
        texto = texto.concat('        <title>Reporte de Errores Encontrados</title>\n');
        texto = texto.concat('    </head>\n');
        texto = texto.concat('    <body style="font-family: Arial; padding: 20px; text-align: center; background-color: #31cbd2;">\n');
        texto = texto.concat('        <h1>Reporte de Errores Encontrados</h1>\n');
        texto = texto.concat('\n');

        if (errores.length == 0) {
            texto = texto.concat('        <h2>No Se Encontraron Errores</h2>\n');
        } else {
            var num = 0;

            texto = texto.concat('        <h2>Errores Lexicos encontrados:</h2>\n');
            texto = texto.concat('        <table border="1" style="width: 100%; text-align: center;">\n');
            texto = texto.concat('            <tr>\n');
            texto = texto.concat('                <th>#</th>\n');
            texto = texto.concat('                <th>Lexema</th>\n');
            texto = texto.concat('                <th>Tipo</th>\n');
            texto = texto.concat('                <th>Fila</th>\n');
            texto = texto.concat('                <th>Columna</th>\n');
            texto = texto.concat('            </tr>\n');
    
            do {
                let error = errores[num];
    
                texto = texto.concat('            <tr>\n');
                texto = texto.concat('                <td>' + (index + 1) + '</td>\n');
                texto = texto.concat('                <td>' + error.getLexema() + '</td>\n');
                texto = texto.concat('                <td>' + error.getTipo() + '</td>\n');
                texto = texto.concat('                <td>' + error.getFila() + '</td>\n');
                texto = texto.concat('                <td>' + error.getColumna() + '</td>\n');
                texto = texto.concat('            </tr>\n');
                texto = texto.concat('\n');

                num++;
            } while (num < errores.length || errores[num].getTipo() == 'Error Lexico');
    
            texto = texto.concat('        </table>\n');    

            texto = texto.concat('\n');
            texto = texto.concat('        <h2>Errores Sintacticos encontrados:</h2>\n');
            texto = texto.concat('        <table border="1" style="width: 100%; text-align: center;">\n');
            texto = texto.concat('            <tr>\n');
            texto = texto.concat('                <th>#</th>\n');
            texto = texto.concat('                <th>Lexema</th>\n');
            texto = texto.concat('                <th>Tipo</th>\n');
            texto = texto.concat('                <th>Fila</th>\n');
            texto = texto.concat('                <th>Columna</th>\n');
            texto = texto.concat('            </tr>\n');
    
            do {
                let error = errores[num];
    
                texto = texto.concat('            <tr>\n');
                texto = texto.concat('                <td>' + (index + 1) + '</td>\n');
                texto = texto.concat('                <td>' + error.getLexema() + '</td>\n');
                texto = texto.concat('                <td>' + error.getTipo() + '</td>\n');
                texto = texto.concat('                <td>' + error.getFila() + '</td>\n');
                texto = texto.concat('                <td>' + error.getColumna() + '</td>\n');
                texto = texto.concat('            </tr>\n');
                texto = texto.concat('\n');

                num++;
            } while (num < errores.length);
    
            texto = texto.concat('        </table>\n');    
        }

        texto = texto.concat('    </body>\n');
        texto = texto.concat('</html>\n');

        if(nombre != null) {
            fs.writeFile(nombre + '.html', texto, (error) => {
                if (error) {
                    console.log('Error al generar El Reporte HTML');
                } else {
                    console.log('Reporte HTML generado correctamente');
                }
            })
        } else {
            fs.writeFile('201831605_errores.html', texto, (error) => {
                if (error) {
                    console.log('Error al generar El Reporte HTML');
                } else {
                    console.log('Reporte HTML generado correctamente');
                }
            })
        }    
    }
}

module.exports = GeneradorDeHTML;