import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule aquí

@Component({
  selector: 'app-root',
  standalone: true,  // Indica que es un componente standalone
  imports: [RouterModule],  // Asegúrate de incluir RouterModule en el array de imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'predial';
}
