import { Component, computed, inject, signal } from '@angular/core'; // Import der inject-Funktion von Angular, um die den ConcertService zu injizieren
import { ConcertService } from '../../services/concert'; // Import des ConcertService, um auf die Konzerte zuzugreifen
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe], // Import des RouterLink-Moduls, um Navigation innerhalb der Anwendung zu ermöglichen
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Injection des ConcertService, um auf die Konzerte zuzugreifen
  concertService = inject(ConcertService);

  // Filter-Zustand für die Dashboard-Kacheln: 'all', 'upcoming' oder 'past', im initialen Zustand auf 'all' gesetzt
  selectedFilter = signal<'all' | 'upcoming' | 'past'>('all');

  // Berechnetes, schreibgeschütztes Signal, das die Konzerte als Liste basierend auf dem ausgewählten Filter zurückgibt
  filteredConcerts = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'upcoming') return this.concertService.upcomingConcerts();
    if (filter === 'past') return this.concertService.pastConcerts();
    return this.concertService.allConcerts(); // 'all' oder kein Filter ausgewählt, daher werden alle Konzerte zurückgegeben
  });

  // schaltet bei Klick-Ereignis auf entsprechende Dashboard-Kachel den Filter um und aktualisiert die gefilterte Konzertliste
  switchFilter(newFilter: 'all' | 'upcoming' | 'past'): void {
    this.selectedFilter.set(newFilter);
  }

  onDelete(concertId: string): void {
      if (confirm('Möchtest du dieses Konzert wirklich löschen?')) { // Browsereigene Funktion mit Bestätigungsabfrage, um versehentliches Löschen zu verhindern
        this.concertService.deleteConcert(concertId);
      }
    }

}
