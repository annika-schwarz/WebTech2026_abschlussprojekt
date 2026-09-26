//ApplicationConfig = TS-Typ von Angular, der sicherstellt, dass Konfigurations-Struktur korrekt aufgebaut ist
// provideBrowserGlobalErrorListener = Angular-Hilfsmittel, das unerwartete globale Browser-Fehler abfängt & protokolliert
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// provideRouter = aktiviert Routing-system von Angular (Single-Page-App)
// withComponentInputBinding = sorgt dafür, dass URL-Params direkt als @input() in Komponente übergeben werden können
import { provideRouter, withComponentInputBinding } from '@angular/router';  
// provideHttpClient = aktiviert Modul für HTTP-Anfragen (Kommunikation zwischen ConcertService und Express-Backend (localhost:3000))
import { provideHttpClient } from '@angular/common/http';
// lädt Routen/Pfade aus app.routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = { //Dependency Injection: alles im Array (=Konfigurationen) wird global in der App verfügbar
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient()
  ]
};
