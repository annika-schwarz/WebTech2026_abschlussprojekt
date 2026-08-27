import { Component, inject } from '@angular/core'; // Import der inject-Funktion von Angular, um die den ConcertService zu injizieren
import { ConcertService } from '../../services/concert'; // Import des ConcertService, um auf die Konzerte zuzugreifen

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Injection des ConcertService, um auf die Konzerte zuzugreifen
  concertService = inject(ConcertService);
}
