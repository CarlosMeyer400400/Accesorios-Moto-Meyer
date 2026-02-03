import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as Papa from 'papaparse'; // Importamos PapaParse

interface Producto {
  Nombre: string;
  Descripcion: string;
  Precio_publico: string;
  Imagen: string;
}

@Component({
  selector: 'app-inicio', // Cambia el selector a algo más representativo
  standalone: true,
  imports: [CommonModule, RouterModule], // Agregar RouterModule aquí
  templateUrl: './inicio.component.html',  // Cambia el nombre del archivo HTML
  styleUrls: ['./inicio.component.css']  // Cambia el nombre del archivo CSS
})
export class InicioComponent implements OnInit {
  title = 'Urban Rocket';
  datos: Producto[] = []; // Explicitly typed as Producto[]
  showModal = false; // Variable para mostrar/ocultar el modal
  selectedProduct: Producto | null = null; // Producto seleccionado para el modal

  constructor(private http: HttpClient, private router: Router) {} // Agregar Router aquí

  ngOnInit() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKoHiWPT1VSTD68LhVfvqbNpvMRAXS7oEI2dpWZscAOibqya9PmnfxWXTkRfrRpLlgrNNyoVGpespQ/pub?gid=0&single=true&output=csv';

    this.http.get(sheetUrl, { responseType: 'text' }).subscribe(csvData => {
      this.datos = this.convertirCSVaJSON(csvData);
    });
  }

  encodeURIComponent(value: string): string {
    return encodeURIComponent(value);
  }

  convertirCSVaJSON(csv: string): Producto[] {
    const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
    return (result.data as Producto[]).map((item) => {
      return {
        Nombre: item['Nombre'],
        Descripcion: item['Descripcion'],
        Precio_publico: item['Precio_publico'],
        Imagen: item['Imagen']
      };
    });
  }

  openModal(item: Producto) {
    this.selectedProduct = item; // Asigna el producto seleccionado
    this.showModal = true; // Muestra el modal
  }

  closeModal() {
    this.showModal = false; // Cierra el modal
    this.selectedProduct = null; // Limpia el producto seleccionado
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}
