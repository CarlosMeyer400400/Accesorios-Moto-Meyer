import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fotografia',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './fotografia.component.html',
  styleUrl: './fotografia.component.css'
})
export class FotografiaComponent {
  encodeMsg(text: string): string {
    return encodeURIComponent(text);
  }
}
