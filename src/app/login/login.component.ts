import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include the necessary modules here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'Accesorios para Moto Meyer';
  numero: string = '';
  contrasena: string = '';
  loginFailed: boolean = false;
  isPasswordVisible: boolean = false;
  
  private correctNumero = '7713535455';
  private correctContrasena = 'Meyer400';

  constructor(private router: Router) {}

  onLogin() {
    if (this.numero === this.correctNumero && this.contrasena === this.correctContrasena) {
      this.router.navigate(['/administrador']);
    } else {
      this.loginFailed = true;
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
