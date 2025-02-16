import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header appTitle="Shopic" />
    <div class="container my-5">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shopic.frontend';
}
