import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { NavComponent } from './components/nav/nav';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root', 
  imports: [RouterOutlet, HeaderComponent, NavComponent, HomeComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myConcerts');
}
