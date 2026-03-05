import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-diseno-web',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './diseno-web.component.html',
  styleUrl: './diseno-web.component.css'
})
export class DisenoWebComponent {
  encodeMsg(text: string): string {
    return encodeURIComponent(text);
  }
}
