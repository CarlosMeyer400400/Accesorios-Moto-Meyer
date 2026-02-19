import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import * as Papa from 'papaparse';

interface Producto {
  Nombre: string;
  Descripcion: string;
  Precio_publico: string;
  Imagen: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  title = 'Urban Rocket';
  datos: Producto[] = [];
  showModal = false;
  selectedProduct: Producto | null = null;

  constructor(private http: HttpClient, private router: Router) {}

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

    return (result.data as Producto[])
      .map((item) => ({
        Nombre: item['Nombre']?.trim() || '',
        Descripcion: item['Descripcion']?.trim() || '',
        Precio_publico: item['Precio_publico']?.trim() || '',
        Imagen: item['Imagen']?.trim() || ''
      }))
      .reverse(); // 🔥 Aquí se invierte el orden (último primero)
  }

  openModal(item: Producto) {
    this.selectedProduct = item;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}
