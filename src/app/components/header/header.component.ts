import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="header">
      <div class="d-flex align-items-center gap-1">
        <img class="logo" src="logo.svg">
        <h4 class="m-0 fw-bold">{{ appTitle }}</h4>
      </div>

      <nav>
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item">
            <a routerLink="/home" routerLinkActive="link-success">Главная</a>
          </li>
          <li class="list-group-item">
            <a routerLink="/catalog" routerLinkActive="link-success">Каталог</a>
          </li>
          <li class="list-group-item">
            <a routerLink="/admin" routerLinkActive="link-success">Админка</a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({ required: true }) appTitle: string = 'Shopic';
}
