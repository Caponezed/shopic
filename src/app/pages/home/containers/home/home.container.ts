import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.container.html',
  styleUrl: './home.container.css'
})
export class HomeContainer {
  now: Date = new Date();
}
