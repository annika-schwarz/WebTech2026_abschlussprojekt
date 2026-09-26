import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Concert } from '../models/concert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {

  private http = inject(HttpClient); // injeziert HttPClient für API-Anfragen
  private apiUrl = 'http://localhost:3000/api/concerts'; // Basis-URL fürs Express-Backend

  // Erstellung Signal vom Typ Concert[] (initialisiert mit leerem Array)
  private concerts = signal<Concert[]>([]);

  // schreibgeschützte Version des Signals, die nur gelesen werden kann
  allConcerts = this.concerts.asReadonly();

  constructor() {
    this.loadConcerts();
  }

  // Methode zum Abrufen aller Konzerte im Backend
  loadConcerts(): void {
    this.http.get<Concert[]>(this.apiUrl).subscribe({   // http-GET-Anfrage an Backend-URL, die als Concerts[] typisiert ist, die durch .subscribe() abgeschickt wird
      // Wenn erfolgreiche Antwort (200 OK etc.) vom Backend
      next: (data) => {     // data = vom Backend gesendete JSON-Daten (Concert[])
        console.log('Daten erfolgreich empfangen:', data);
        this.concerts.set(data);    // this.concerts enthält nun alle Konzerte vom Backend
      },
      // wenn Anfrage fehlschlägt
      error: (err) => {   // err = HttPErrorResponse-Objekt mit Eigenschaften
        console.error('Fehler bei der HTTP-Anfrage:', err);   // gibt alle Infos des Error-Objekts aus
      },
      complete: () => {
        console.log('HTTP-Anfrage ist abgeschllossen.');
      }
    });
  } 
  
  // berechnetes (schreibgeschütztes) Signal, das vergangene Konzerte zurückgibt
  pastConcerts = computed(() => {
    const today = new Date().toISOString().split('T')[0]; // aktuelles Datum im Format YYYY-MM-DD
    return this.concerts().filter(c => c.date < today); // Filterung der Konzerte, die in der Vergangenheit liegen
  })


  // berechnetes (schreibgeschütztes) Signal, das zukünftige Konzerte (einschließlich des heutigen Datums) zurückgibt
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


  // Methode zum Abrufen eines Konzerts anhand der ID
  getConcertById(concertID: string): Concert | undefined {
    return this.concerts().find(concert => concert.id === concertID);
  }


  // Methode zum Aktualisieren eines bestehenden Konzerts
  updateConcert(id: string, updatedData: Partial<Omit<Concert, 'id'>>): void {  //geschachtelter TypeScript Utility Type: Omit<Concert, 'id'> erstellt Typ, der alle Eigenschaften von Concert enthält, außer 'id'. Partial<Omit<Concert, 'id'>> macht alle Eigenschaften optional (?), sodass nur die zu aktualisierenden Felder übergeben werden müssen.
    const today = new Date().toISOString().split('T')[0];

    this.concerts.update(currentConcerts =>
      currentConcerts.map(concert => {    // geht durch jedes Konzert im aktuellen Signal und prüft, ob die ID übereinstimmt.
        if (concert.id === id) {
          const updatedConcert = { ...concert, ...updatedData };    // Wenn ja, wird das Konzert mit den neuen Daten aktualisiert, andernfalls bleibt es unverändert.
          updatedConcert.isPast = (updatedConcert.date < today);    // isPast (true/false) wird neu berechnet für den Fall, dass das Datum geändert wurde
          return updatedConcert;
        }
        return concert;
      })
    );
  }


  // Methode zum Löschen eines Konzerts aus dem Signal anhand der ID
  deleteConcert(concertId: string): void {
    this.concerts.update(currentConcerts =>
      currentConcerts.filter(c => c.id !== concertId) // filtert das Konzert mit der angegebenen ID heraus und erstellt ein neues Array ohne dieses Konzertgi
      
    );
  }

// Berechnetes Signal für den Bewertungsschnitt aller bewerteten Konzerte
averageRating = computed(() => {
  const ratedConcerts = this.concerts().filter(c => c.rating !== undefined && c.rating !== null); // Filtert nur die Konzerte, die eine Bewertung haben
  if (ratedConcerts.length === 0) {             // Wenn keine Konzerte bewertet wurden, wird '0.0' zurückgegeben
    return '0.0';
  }
  const sum = ratedConcerts.reduce((currentSum, c) => currentSum + (c.rating ?? 0), 0);   // Berechnung der Summe der Bewertungen, wobei undefined oder null als 0 behandelt wird, ?? ist der Nullish Coalescing Operator, der den rechten Wert zurückgibt, wenn der linke Wert null oder undefined ist
  return (sum / ratedConcerts.length).toFixed(1); // Umwandlung in einen String (.toFixed(1)) mit 1 Nachkommastelle
});

}
