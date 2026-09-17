import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('./pages/home/home'),    // Home-Komponente wird geladen, wenn der Pfad leer ist (Startseite)
    title: 'myConcerts - Home', // Titel der Seite, der im Browser-Tab angezeigt wird
  },
  { path: 'add',
    loadComponent: () => import('./pages/add-concert/add-concert'), // AddConcert-Komponente wird geladen, wenn der Pfad 'add' ist (Seite zum Hinzufügen eines neuen Konzerts)
    title: 'myConcerts - Konzert hinzufügen', // Titel der Seite, der im Browser-Tab angezeigt wird
  },
  { path: 'edit/:id',
    loadComponent: () => import('./pages/edit-concert/edit-concert'), // EditConcert-Komponente wird geladen, wenn der Pfad 'edit/:id' ist (Seite zum Bearbeiten eines bestehenden Konzerts)
    title: 'myConcerts - Konzert bearbeiten', // Titel der Seite, der im Browser-Tab angezeigt wird
  },
   { path: '**', redirectTo: ''   // Wildcard-Route, die alle nicht definierten Pfade auf die Startseite umleitet
   }   
];
