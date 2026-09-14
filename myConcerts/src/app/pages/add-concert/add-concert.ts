import { Component } from '@angular/core';
import { ConcertFormComponent } from '../../components/concert-form/concert-form';

@Component({
  selector: 'app-add-concert',
  imports: [ ConcertFormComponent ],
  templateUrl: './add-concert.html',
  styleUrl: './add-concert.css',
})
export class AddConcertComponent {}
