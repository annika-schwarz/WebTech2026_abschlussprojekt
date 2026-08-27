import { Injectable, signal, computed } from '@angular/core';
import { Concert } from '../models/concert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {

                                             // Erstellung Signal vom Typ Concert[]
                                              // (Array von Concert-Objekten),
                                              // das als leer initialisiert wird.

  private concerts = signal<Concert[]>([
    {
      id: '1',
      artist: 'Die Ärzte',
      venue: 'Waldbühne',
      date: '2024-06-15',
      isPast: true
    },
    {
      id: '2',
      artist: 'Beatsteaks',
      venue: 'Colos-Saal',
      date: '2026-11-20',
      isPast: false
    }
  ]);

  allConcerts = this.concerts.asReadonly(); // schreibgeschützte Version des Signals, die nur gelesen werden kann

  pastConcerts = computed(() => {
    const today = new Date().toISOString().split('T')[0]; // aktuelles Datum im Format YYYY-MM-DD
    return this.concerts().filter(c => c.date < today); // Filterung der Konzerte, die in der Vergangenheit liegen
  })

  upcomingConcerts = computed(() => {
    const today = new Date().toISOString().split('T')[0]; // aktuelles Datum im Format YYYY-MM-DD
    return this.concerts().filter(c => c.date >= today); // Filterung der Konzerte, die in der Zukunft (+ heutiges Datum) liegen
  })

  addConcert(concertData: Omit<Concert, 'id'| 'isPast'>): void {  // Utility Type Omit kreiert einen neuen Typ, der alle Eigenschaften von Concert enthält, außer 'id' und 'isPast'
    const today = new Date().toISOString().split('T')[0];         // aktuelles Datum im Format YYYY-MM-DD

    const newConcert: Concert = {
      ...concertData,
      id: crypto.randomUUID(), // Generierung einer eindeutigen ID für das neue Konzert
      isPast: concertData.date < today // Bestimmung, ob das Konzert in der Vergangenheit liegt
    };

    this.concerts.update(currentConcerts => [...currentConcerts, newConcert]); // Hinzufügen des neuen Konzerts zum Signal durch Erstellen eines neuen Arrays, das alle aktuellen Konzerte und das neue Konzert enthält

  }


}
