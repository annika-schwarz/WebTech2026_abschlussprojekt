import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',   // Leitet den leeren Pfad auf die Home-Seite um
    pathMatch: 'full'   // Stellt sicher, dass die Umleitung nur erfolgt, wenn der gesamte Pfad leer ist und nicht nur ein Teil davon
  },
  { path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),    // Home-Komponente wird geladen, wenn der Pfad leer ist (Startseite)
    title: 'myConcerts - Home', // Titel der Seite, der im Browser-Tab angezeigt wird
  },
  { path: 'add',
    loadComponent: () => import('./pages/add-concert/add-concert').then(m => m.AddConcertComponent), // AddConcert-Komponente wird geladen, wenn der Pfad 'add' ist (Seite zum Hinzufügen eines neuen Konzerts)
    title: 'myConcerts - Konzert hinzufügen', // Titel der Seite, der im Browser-Tab angezeigt wird
  },
  { path: 'edit/:id',
    loadComponent: () => import('./pages/edit-concert/edit-concert').then(m => m.EditConcertComponent), // EditConcert-Komponente wird geladen, wenn der Pfad 'edit/:id' ist (Seite zum Bearbeiten eines bestehenden Konzerts)
    title: 'myConcerts - Konzert bearbeiten', // Titel der Seite, der im Browser-Tab angezeigt wird
  },
   { path: '**', redirectTo: 'home'    // Wildcard-Route, die alle nicht definierten Pfade auf die Startseite umleitet
   }   
];
