import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as Papa from 'papaparse'; // Importamos PapaParse

// Interface Producto
interface Producto {
  Nombre: string;
  Descripcion: string;
  Precio_publico: string;
  Imagen: string;
}

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  title = 'Administrador de Productos';
  productos: Producto[] = []; // Array para almacenar los productos
  showModal = false; // Para mostrar el modal
  selectedProduct: Producto | null = null; // Producto seleccionado para el modal

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKoHiWPT1VSTD68LhVfvqbNpvMRAXS7oEI2dpWZscAOibqya9PmnfxWXTkRfrRpLlgrNNyoVGpespQ/pub?gid=0&single=true&output=csv';

    this.http.get(sheetUrl, { responseType: 'text' }).subscribe(csvData => {
      this.productos = this.convertirCSVaJSON(csvData);
    });
  }

  convertirCSVaJSON(csv: string): Producto[] {
    const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
    return (result.data as Producto[]).map((item) => ({
      Nombre: item['Nombre'],
      Descripcion: item['Descripcion'],
      Precio_publico: item['Precio_publico'],
      Imagen: item['Imagen']
    }));
  }

  openModal(item: Producto) {
    this.selectedProduct = item; // Asigna el producto seleccionado
    this.showModal = true; // Muestra el modal
  }

  closeModal() {
    this.showModal = false; // Cierra el modal
    this.selectedProduct = null; // Limpia el producto seleccionado
  }

  // Método para eliminar el producto
  eliminarProducto(nombre: string): void {
    this.productos = this.productos.filter(producto => producto.Nombre !== nombre);
  }
}
