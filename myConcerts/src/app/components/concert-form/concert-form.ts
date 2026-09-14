import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Concert } from '../../models/concert.model';

@Component({
  selector: 'app-concert-form',
  imports: [ReactiveFormsModule],
  templateUrl: './concert-form.html',
  styleUrl: './concert-form.css',
})
export class ConcertFormComponent {

  //erstellt Formulargruppe, die unten definiert wird
  // so muss man nicht jeweils die einzelnen FormControls erstellen
  private formbuilder = inject(FormBuilder);

  // von Angular bereitgestelltes input-signal, womit eltern-Komponenten Daten an die Kind-Komponente übergeben können
  // wenn Bearbeiten-Modus, dann wird das input-signal mit den Daten des zu bearbeitenden Konzerts befüllt
  // ansonsten ist das input-signal null, was bedeutet, dass ein neues Konzert erstellt werden soll
  initialData = input < Concert | null >(null);

  // von Angular bereitgestelltes output-signal, womit Kind-Komponenten Daten an die Eltern-Komponente übergeben können
  // Typisierung: Omit<Concert, 'id' | 'isPast'>, da id und isPast nicht vom Benutzer eingegeben werden sollen
  submitForm = output <Omit<Concert, 'id' | 'isPast'>>();

  // Sammlung von vorgefertigten Prüfregeln von Angular für Formularfelder
  // initial leer (''), Validators.required = Pflichtfeld, muss ausgefüllt werden
  // Validators gibt null zurück, wenn das Feld korrekt ausgefüllt ist, ansonsten ein Objekt mit dem Fehler
  concertForm = this.formbuilder.nonNullable.group({
    artist: ['', Validators.required],
    supportActs: [''],
    venue: ['', Validators.required],
    date: ['', Validators.required],
    rating: [null as number | null, [Validators.min(1), Validators.max(5)]], // min und max für die Bewertung
    comments: ['']
  });

  // Schlüsselwort "constructor" ist eine spezielle Methode,
  // die beim Erstellen einer Instanz der Komponente aufgerufen wird
  constructor() {
    effect(() => {    // effect() ist eine Funktion von Angular, die auf Änderungen von Signalen reagiert
      const data = this.initialData();    // ruft den aktuellen Wert des input-Signals ab
      if (data) {   // wenn Daten vorhanden sind, bedeutet das, dass wir uns im Bearbeiten-Modus befinden
        this.concertForm.patchValue({   // patchValue() ist eine Methode von Angular, die es ermöglicht, nur bestimmte Felder eines Formulars zu aktualisieren
          artist: data.artist,
          supportActs: data.supportActs || '', // leerer String, wenn keine Support-Acts vorhanden sind
          venue: data.venue,
          date: data.date,
          rating: data.rating ?? null, // null, wenn keine Bewertung vorhanden ist
          comments: data.comment || '' // leerer String, wenn kein Kommentar vorhanden ist
        });
      }
    });
  }

  // Methode, die aufgerufen wird, wenn das Formular abgeschickt wird
  onSubmit(): void {
    if (this.concertForm.valid) {   // prüft, ob das Formular korrekt ausgefüllt ist
      this.submitForm.emit(this.concertForm.getRawValue());  // emit() ist eine Methode von Angular, die das output-Signal auslöst und die Daten an die Eltern-Komponente übergibt
    }
  }   


}
