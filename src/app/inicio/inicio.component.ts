import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  datos: Producto[] = [];
  datosFiltrados: Producto[] = [];
  showModal = false;
  selectedProduct: Producto | null = null;
  isLoading = true;
  searchTerm = '';

  private readonly WHATSAPP_NUMBER = '7713535455';
  private readonly SHEET_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKoHiWPT1VSTD68LhVfvqbNpvMRAXS7oEI2dpWZscAOibqya9PmnfxWXTkRfrRpLlgrNNyoVGpespQ/pub?gid=0&single=true&output=csv';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get(this.SHEET_URL, { responseType: 'text' }).subscribe({
      next: (csvData) => {
        this.datos = this.convertirCSVaJSON(csvData);
        this.datosFiltrados = [...this.datos];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  convertirCSVaJSON(csv: string): Producto[] {
    const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
    return (result.data as any[]).map((item) => ({
      Nombre: item['Nombre'] ?? '',
      Descripcion: item['Descripcion'] ?? '',
      Precio_publico: item['Precio_publico'] ?? '',
      Imagen: item['Imagen'] ?? ''
    }))
        .reverse(); // ← ¡Esta línea sola invierte el orden!
  }

  filtrarProductos(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.datosFiltrados = term
      ? this.datos.filter(p =>
          p.Nombre.toLowerCase().includes(term) ||
          p.Descripcion.toLowerCase().includes(term)
        )
      : [...this.datos];
  }

  limpiarBusqueda(): void {
    this.searchTerm = '';
    this.datosFiltrados = [...this.datos];
  }

  getWhatsAppLink(item: Producto): string {
    const msg = encodeURIComponent(
      `Hola! 👋 Estoy interesado en:\n` +
      `🛍️ *${item.Nombre}*\n` +
      `💰 Precio: $${item.Precio_publico}\n` +
      `¿Está disponible?`
    );
    return `https://wa.me/${this.WHATSAPP_NUMBER}?text=${msg}`;
  }

  openModal(item: Producto): void {
    this.selectedProduct = item;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  irALogin(): void {
    this.router.navigate(['/login']);
  }
}
