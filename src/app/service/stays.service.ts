import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Stays } from '../interfaces/stays';
import { STAYS } from '../data-mock/stays';

@Injectable({
  providedIn: 'root'
})
export class StaysService {

  constructor() { }

  getStays(): Observable<Stays[]> {
    const stays = of(STAYS);
    return stays;
  }
}
