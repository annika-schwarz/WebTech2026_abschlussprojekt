import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('./pages/home/home').then((module) => module.HomeComponent),    // Home-Komponente wird geladen, wenn der Pfad leer ist (Startseite), Rückgabetyp ist ein Promise, das die Home-Komponente (Modul-Objekt) enthält
  },
  { path: 'add',
    loadComponent: () => import('./pages/add-concert/add-concert').then((module) => module.AddConcertComponent), // AddConcert-Komponente wird geladen, wenn der Pfad 'add' ist (Seite zum Hinzufügen eines neuen Konzerts), Rückgabetyp ist ein Promise, das die AddConcert-Komponente (Modul-Objekt) enthält
  },
  { path: 'edit/:id',
    loadComponent: () => import('./pages/edit-concert/edit-concert').then((module) => module.EditConcertComponent), // EditConcert-Komponente wird geladen, wenn der Pfad 'edit/:id' ist (Seite zum Bearbeiten eines bestehenden Konzerts), Rückgabetyp ist ein Promise, das die EditConcert-Komponente (Modul-Objekt) enthält
  },
  { path: '**', redirectTo: '' }   // Wildcard-Route, die alle nicht definierten Pfade auf die Startseite umleitet
];
