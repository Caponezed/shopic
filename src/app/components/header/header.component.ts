import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <div class="header">
      <div class="d-flex align-items-center gap-1">
        <img class="logo" src="logo.svg">
        <h4 class="m-0 fw-bold">{{ appTitle }}</h4>
      </div>
    </div>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({ required: true }) appTitle: string = 'Shopic';
}
