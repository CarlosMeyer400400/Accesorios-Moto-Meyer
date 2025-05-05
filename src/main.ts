import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app/app.routes';  // Importa AppRoutingModule desde app.routes.ts

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(AppRoutingModule),  // Agregar AppRoutingModule aquí
  ]
});
