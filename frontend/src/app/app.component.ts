import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  codigo: string = '';
  consola: string = '';
  lexemas: any[] = [];
  errores: any[] = [];
  direccion: string = '';

  constructor(private apiService: ApiService, private modalService: NgbModal) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  analizar() {
    if (this.codigo.trim() === '') {
      alert('El campo de código no puede estar vacío.');
      return;
    }

    this.apiService.analizarCodigo(this.codigo).subscribe(
      (res: { tokens: any[]; errores: any[]; textoConsola: any }) => {
        this.lexemas = res.tokens || [];
        this.errores = res.errores || [];
        this.imprimirEnConsola();
        this.consola += "\n" + res.textoConsola + "\n";
      },
      (err: any) => {
        console.error('Error al analizar el código:', err);
        console.log('Error:', err.error);
        alert('Hubo un error al comunicarse con la API.');
      }
    );
  }

  limpiar() {
    this.codigo = '';
    this.consola = '';
    this.lexemas = [];
    this.errores = [];
  }

  imprimirEnConsola() {
    // Imprimir los lexemas y los errores en la consola
    this.consola = '';

    this.consola += 'Tokens:\n';
    this.lexemas.forEach((lexema) => {
      this.consola += `${lexema.tipo} - (${lexema.lexema})\n`;
    });

    this.consola += '\nErrores:\n';
    this.errores.forEach((error) => {
      this.consola += `${error.tipo} - (${error.lexema})\n`;
    });
  }

  abrirArchivo(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
      this.direccion = '';
    }

    this.direccion = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.codigo = e.target?.result as string;
    }

    reader.readAsText(file);

  }

  guardarArchivo() {
    const a = document.createElement('a');
    const blob = new Blob([this.codigo], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "archivoDeTexto.nlex";
    a.click();
  }

  guardarComo() {
    const a = document.createElement('a');
    const blob = new Blob([this.codigo], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "archivoDeTexto.txt";
    a.click();
  }

}
