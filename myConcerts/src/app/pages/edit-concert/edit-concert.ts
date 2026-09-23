import { Component, OnInit, inject, signal } from '@angular/core';
import { ConcertFormComponent } from '../../components/concert-form/concert-form';
import { ActivatedRoute, Router } from '@angular/router';
import { ConcertService } from '../../services/concert';
import { Concert } from '../../models/concert.model';

@Component({
  selector: 'app-edit-concert',
  imports: [ ConcertFormComponent ],
  templateUrl: './edit-concert.html',
  styleUrl: './edit-concert.css',
})
export class EditConcertComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private concertService = inject(ConcertService);

  // // Signal speichert das geladene Konzert (oder null, solange geladen wird)
  concertToEdit = signal <Concert | null>(null);

  ngOnInit(): void {

    // ID des Konzerts aus der URL auslesen
    const concertId = this.route.snapshot.paramMap.get('id');

    if (concertId) {
      const concert = this.concertService.getConcertById(concertId);
      if (concert) {
        this.concertToEdit.set(concert);  // gefundenes Konzert im Signal (bis jetzt null) speichern
      }
      else {
        // Fallback zur Startseite, falls ID ungültig oder nicht existiert
        this.router.navigate(['/']);
      }
    }
  }

  onUpdate(formData : Omit<Concert, 'id' | 'isPast'>): void {
    const currentConcert = this.concertToEdit();
    if (currentConcert) {   // prüft, ob das Signal ein Konzert enthält (nicht null)
      this.concertService.updateConcert(currentConcert.id, formData);
      this.router.navigate(['/']); // navigiert zur Startseite, nachdem das Konzert aktualisiert wurde
    }
  }


}
