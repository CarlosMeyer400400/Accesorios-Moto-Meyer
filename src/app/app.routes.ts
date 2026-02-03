import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'inicio' }  // Ruta comodín para redirigir a 'inicio' si no se encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Esto asegura que las rutas sean cargadas al inicio
  exports: [RouterModule]
})
export class AppRoutingModule { }
