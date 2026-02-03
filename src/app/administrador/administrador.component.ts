import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  
  urlSegura: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Marcamos la URL como segura para que Angular permita cargarla en el iframe
    this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl('https://urban-rocket-bd.vercel.app/');
  }

  ngOnInit(): void {}
}