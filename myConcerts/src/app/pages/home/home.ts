import { Component, computed, inject, signal } from '@angular/core'; // Import der inject-Funktion von Angular, um die den ConcertService zu injizieren
import { ConcertService } from '../../services/concert'; // Import des ConcertService, um auf die Konzerte zuzugreifen
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Concert } from '../../models/concert.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe], // Import des RouterLink-Moduls, um Navigation innerhalb der Anwendung zu ermöglichen
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  // Injection des ConcertService, um auf die Konzerte zuzugreifen
  concertService = inject(ConcertService);

  // Filter-Zustand für die Dashboard-Kacheln: 'all', 'upcoming' oder 'past', im initialen Zustand auf 'all' gesetzt
  selectedFilter = signal<'all' | 'upcoming' | 'past'>('all');

  // Neues Signal für die Texteingabe in der Suchleiste
  searchQuery = signal<string>('');

 // Berechnetes, schreibgeschütztes Signal, das die Konzerte als Liste basierend auf dem ausgewählten Filter zurückgibt
  filteredConcerts = computed(() => {
    const filter = this.selectedFilter();
    const query = this.searchQuery().toLowerCase().trim();
    
    // list im default = alle Konzerte, wird je nach Filter auf die entsprechenden Konzerte gesetzt
    let list = this.concertService.allConcerts();
      if (filter === 'upcoming') list = this.concertService.upcomingConcerts();
      if (filter === 'past') list = this.concertService.pastConcerts();

    // Nach Suchbegriff filtern (Haupt-Act, Vorbands oder Ort)
    if (query !== '') {
      list = list.filter(c => 
        c.artist.toLowerCase().includes(query) ||
        (c.supportActs && c.supportActs.toLowerCase().includes(query)) ||
        c.venue.toLowerCase().includes(query)
      );
    }

    // Sortierung: Jüngstes / am weitesten in der Zukunft liegendes Konzert zuerst (absteigend)
    // [...list] erstellt eine Kopie, da .sort() das ursprüngliche Array mutieren würde
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  });

  // schaltet bei Klick-Ereignis auf entsprechende Dashboard-Kachel den Filter um und aktualisiert die gefilterte Konzertliste
  switchFilter(newFilter: 'all' | 'upcoming' | 'past'): void {
    this.selectedFilter.set(newFilter);
  }

  // Methode zum Aktualisieren des Suchsignals bei jedem Tastendruck
  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery.set(inputElement.value);
  }

  onDelete(concertId: string): void {
      if (confirm('Möchtest du dieses Konzert wirklich löschen?')) { // Browsereigene Funktion mit Bestätigungsabfrage, um versehentliches Löschen zu verhindern
        this.concertService.deleteConcert(concertId);
      }
    }

}
