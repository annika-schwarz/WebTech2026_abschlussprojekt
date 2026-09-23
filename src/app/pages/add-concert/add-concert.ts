import { Component, inject } from '@angular/core';
import { ConcertFormComponent } from '../../components/concert-form/concert-form';
import { ConcertService } from '../../services/concert';
import { Router } from '@angular/router';
import { Concert } from '../../models/concert.model';

@Component({
  selector: 'app-add-concert',
  imports: [ ConcertFormComponent ],
  templateUrl: './add-concert.html',
  styleUrl: './add-concert.css',
})
export class AddConcertComponent {

  private concertService = inject(ConcertService); // injiziert den ConcertService, um auf die Methoden zum Speichern von Konzerten zuzugreifen
  private router = inject(Router); // injiziert den Router, um nach dem Speichern des Konzerts zur Startseite zu navigieren

  // Methode, die aufgerufen wird, wenn das Formular abgeschickt wird
  onSave(formData: Omit<Concert, 'id' | 'isPast'>): void {
    this.concertService.addConcert(formData); // ruft die Methode zum Hinzufügen eines Konzerts im ConcertService auf
    this.router.navigate(['/']); // navigiert zur Startseite, nachdem das Konzert gespeichert wurde
  }

}
