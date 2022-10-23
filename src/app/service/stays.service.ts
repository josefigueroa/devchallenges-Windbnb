import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Stays } from '../interfaces/stays';

@Injectable({
  providedIn: 'root'
})
export class StaysService {

  baseUrl: string = environment.urlStays;
  
  constructor(private http: HttpClient) { }

  getStays(): Observable<Stays[]> {
    return this.http.get<Stays[]>(this.baseUrl);
  }

  getFilterStays(city: string, maxGuests:number = 0): Observable<Stays[]>{     
    return this.http.get<Stays[]>(this.baseUrl)
      .pipe(
        map(data => 
          data.filter((item) => {                        
            if(maxGuests !== 0){
              return item.city.includes(city) && item.maxGuests >= maxGuests;
            }

            return item.city.includes(city)
          })
        )
      )
      
  }
  getAutocomplete(city: string ): Observable<Stays[]>{     
    return this.http.get<Stays[]>(this.baseUrl)
      .pipe(
        map(data => 
          data.filter((item) => {                
            return item.city.includes(city)
          })
        )
      )      
  }
}
