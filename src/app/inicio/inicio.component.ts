import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as Papa from 'papaparse';

interface Producto {
  ID: string;
  Nombre: string;
  Descripcion: string;
  Precio_publico: string;
  Imagen: string;
  Stock: number;
  Estado: string;
  Orden: number;
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
  currentIndex: number = 0;

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

    return (result.data as any[])
      .map((item) => ({
        ID: item['id'] ?? item['ID'] ?? '',
        Nombre: item['nombre'] ?? item['Nombre'] ?? '',
        Descripcion: item['descripcion'] ?? item['Descripcion'] ?? '',
        Precio_publico: item['precio_publico'] ?? item['Precio_publico'] ?? '',
        Imagen: item['imagen'] ?? item['Imagen'] ?? '',
        Stock: Number(item['stock'] ?? item['Stock'] ?? 0),
        Estado: String(item['estado'] ?? item['Estado'] ?? '').trim().toLowerCase(),
        Orden: Number(item['orden'] ?? item['Orden'] ?? 999999)
      }))
      .filter((p) => p.Stock > 0 && p.Estado === 'habilitado')
      .sort((a, b) => a.Orden - b.Orden);
  }

  filtrarProductos(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.datosFiltrados = term
      ? this.datos.filter(p =>
          (p.Nombre ?? '').toLowerCase().includes(term) ||
          (p.Descripcion ?? '').toLowerCase().includes(term)
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
      `📦 Stock disponible: ${item.Stock}\n` +
      `¿Está disponible?`
    );
    return `https://wa.me/${this.WHATSAPP_NUMBER}?text=${msg}`;
  }

  openModal(item: Producto): void {
    this.currentIndex = this.datosFiltrados.indexOf(item);
    this.selectedProduct = item;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }

  prevProduct(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedProduct = this.datosFiltrados[this.currentIndex];
    }
  }

  nextProduct(): void {
    if (this.currentIndex < this.datosFiltrados.length - 1) {
      this.currentIndex++;
      this.selectedProduct = this.datosFiltrados[this.currentIndex];
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  irALogin(): void {
    this.router.navigate(['/login']);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (!this.showModal) return;
    if (e.key === 'ArrowLeft') this.prevProduct();
    if (e.key === 'ArrowRight') this.nextProduct();
    if (e.key === 'Escape') this.closeModal();
  }
}
