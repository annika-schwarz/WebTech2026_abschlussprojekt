import { Injectable, signal, computed } from '@angular/core';
import { Concert } from '../models/concert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {


  // Erstellung Signal vom Typ Concert[] (Array von Concert-Objekten)
  // mit initialen Testdaten.
  private concerts = signal<Concert[]>([
    {
      id: '1',
      artist: 'Die Ärzte',
      venue: 'Waldbühne',
      date: '2024-06-15',
      isPast: true,
      rating: 5
    },
    {
      id: '2',
      artist: 'Beatsteaks',
      venue: 'Colos-Saal',
      date: '2026-11-20',
      isPast: false,
      rating: 4
    },
    {
    id: '3',
    artist: 'Coldplay',
    venue: 'Olympiastadion Berlin',
    date: '2028-07-12',
    isPast: true,
    rating: 5,
    supportActs: 'Griff',
    comment: 'Unglaubliche Show mit Armbändern und Feuerwerk!'
  },
  {
    id: '4',
    artist: 'Kraftklub',
    venue: 'Westfalenhalle Dortmund',
    date: '2022-11-28',
    isPast: true,
    rating: 4,
    supportActs: 'BLOND',
    comment: 'Klassisches Kraftklub-Moshpit, Wahnsinnsschiedsrichter-Atmosphäre.'
  },
  {
    id: '5',
    artist: 'Deichkind',
    venue: 'Festwiese Leipzig',
    date: '2026-08-22',
    isPast: false,
    supportActs: 'Das Lumpenpack'
  }
  ]);


  // schreibgeschützte Version des Signals, die nur gelesen werden kann
  allConcerts = this.concerts.asReadonly();


  // berechnetes Signal, das die Konzerte in der Vergangenheit zurückgibt
  pastConcerts = computed(() => {
    const today = new Date().toISOString().split('T')[0]; // aktuelles Datum im Format YYYY-MM-DD
    return this.concerts().filter(c => c.date < today); // Filterung der Konzerte, die in der Vergangenheit liegen
  })


  // berechnetes Signal, das die Konzerte in der Zukunft (einschließlich des heutigen Datums) zurückgibt
  upcomingConcerts = computed(() => {
    const today = new Date().toISOString().split('T')[0]; // aktuelles Datum im Format YYYY-MM-DD
    return this.concerts().filter(c => c.date >= today); // Filterung der Konzerte, die in der Zukunft (+ heutiges Datum) liegen
  })


  // Methode zum Hinzufügen eines neuen Konzerts zum Signal
  addConcert(concertData: Omit<Concert, 'id'| 'isPast'>): void {  // Utility Type Omit kreiert einen neuen Typ, der alle Eigenschaften von Concert enthält, außer 'id' und 'isPast'
    const today = new Date().toISOString().split('T')[0];         // aktuelles Datum im Format YYYY-MM-DD

    const newConcert: Concert = {
      ...concertData,
      id: crypto.randomUUID(), // Generierung einer eindeutigen ID für das neue Konzert
      isPast: concertData.date < today // Bestimmung, ob das Konzert in der Vergangenheit liegt
    };

    this.concerts.update(currentConcerts => [...currentConcerts, newConcert]); // Hinzufügen des neuen Konzerts zum Signal durch Erstellen eines neuen Arrays, das alle aktuellen Konzerte und das neue Konzert enthält
  }


  // Methode zum Löschen eines Konzerts aus dem Signal anhand der ID
  deleteConcert(concertId: string): void {
    this.concerts.update(currentConcerts =>
      currentConcerts.filter(c => c.id !== concertId) // filtert das Konzert mit der angegebenen ID heraus und erstellt ein neues Array ohne dieses Konzertgi
      
    );
  }

  // Berechnetes Signal für den Notenschnitt der Bewertungen (1-5)
  averageRating = computed(() => {
    const ratedConcerts = this.concerts().filter(c => c.rating && c.rating > 0); // erstellt Konstante mit allen Konzerten, die eine Bewertung haben und größer als 0 sind
    if (ratedConcerts.length === 0) return '0.0';
    const sumAllRatings = ratedConcerts.reduce((currentSum, c) => currentSum + (c.rating || 0), 0); // summiert alle Bewertungen der Konzerte, die eine Bewertung haben (ansonsten Addition mit 0), und gibt die Summe zurück
    return (sumAllRatings / ratedConcerts.length).toFixed(1); // berechnet den Durchschnitt der Bewertungen und gibt ihn als String mit einer Nachkommastelle zurück (.toFixed(1))
  });

}
