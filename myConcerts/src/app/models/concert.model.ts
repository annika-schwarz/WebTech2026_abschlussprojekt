export interface Concert {
  id: string;           // String um UUIDs nutzen zu können
  artist: string;       //Haupt-Act
  supportActs?: string; //Optional: Vorbands
  venue: string;        //Veranstaltungsort 
  date: string;         //Datum des Konzerts
  isPast: boolean;      //Ob das Konzert in der Vergangenheit liegt
  rating?: number;      //Optional: Bewertung des Konzerts (1-5 Sterne)
  comment?: string;     //Optional: Kommentar zum Konzert
}