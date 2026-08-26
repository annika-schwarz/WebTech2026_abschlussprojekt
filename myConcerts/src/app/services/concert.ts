import { Injectable, signal } from '@angular/core';
import { Concert } from '../models/concert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {

  private concertsSignal = signal<Concert[]>([]); //Signal, das Konzert-Liste bewacht und am Anfang leer ist

  constructor() { }

  async getAll(): Promise<Concert[]> {
    let response = await fetch('./assets/konzerte.json');
    let concerts = await response.json();
    console.log('concerts', concerts)
    return concerts;
  }

}
