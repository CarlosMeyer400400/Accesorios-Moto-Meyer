import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule aquí
import { HeaderComponent } from './componentes/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,  // Indica que es un componente standalone
  imports: [RouterModule,
    HeaderComponent, // 2. Agrégalo aquí para que app-header sea reconocido



  ],  // Asegúrate de incluir RouterModule en el array de imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'Accesorios-Moto-Meyer';
}
