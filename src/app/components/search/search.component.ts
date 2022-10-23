import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';

import { Stays } from 'src/app/interfaces/stays';
import { StaysService } from 'src/app/service/stays.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  searchForm = this.fb.group({
    city: ['', Validators.required],
    maxGuests: ['']
  });

  stays: Stays[] = [];
  staysIn: string = 'Finland';
  stayLength: number = 0;
  stayLocation: Stays[] = [];
  stayLoca: Stays[] = [];
  maxGuest: number = 0;
  adults: number = 0;
  children: number = 0;
  inputFocusMaxGuest :boolean = false;
  private searchTerms = new Subject<string>();

  constructor(private fb: FormBuilder, 
              private staysService: StaysService) { }


  ngOnInit(): void {
    this.getStays();
    this.totalGuest();

    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(1000),

      // ignore new term if same as previous term
      distinctUntilChanged(),
      
      // switch to new search observable each time the term changes
      switchMap((term) => {             
        return this.staysService.getAutocomplete(term);
      })
    )  
    .subscribe((data) => {
      let uniqueArray = data.filter((arr, index, self) => { 
          return index === self.findIndex((t) => (t.city === arr.city ))
      })
     
      this.stayLocation = uniqueArray;
    })

    
      
  }

  // Push a search term into the observable stream.
  search(term: string): void {      
    this.searchTerms.next(term);
  }

  showMenu(){
    const headerSearch = document.querySelector('.header__search');
    
    headerSearch?.classList.add('header__search--show');    

    this.createOverlay();
  }
  
  hideMenu(){
    const headerSearch = document.querySelector('.header__search');    

    headerSearch?.classList.remove('header__search--show');    

    this.removeOverlay();
    
  }

  createOverlay(){
    const overlay = document.createElement("div");

    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }

  removeOverlay(){
    const overlay = document.querySelector('.overlay');
    overlay?.remove();
  }

  getStays(): void {
    this.staysService.getStays()
      .subscribe(stay => {        
        this.stays = stay 
        this.stayLength = stay.length;
      });
  }

  searchFormSubmit() {
    let {city, maxGuests} = this.searchForm.value;     
    
    if(maxGuests === ''){
      maxGuests = 0;
    }    

    this.staysService.getFilterStays(city, maxGuests)
      .subscribe(data => {        
        if(data.length){ 
          this.staysIn = (data[0] ? `${data[0].city}, ${data[0].country}` : "Finland")        
          this.stays = data;
          this.stayLength = data.length;          
          this.hideMenu();
        }       
      })    
  }
  getAutocompleteValue(event: any){
    let target = event.target;
    
    
    if(target.classList.contains('header__location-text')){
      this.searchForm.controls['city'].setValue(target.textContent.split(',')[0])
    }

    this.stayLocation = [];
    
  }
  
  incrementAdults(){
    this.adults++; 
    this.totalGuest()    
  }

  reduceAdults(){  
    if(this.adults < 1) return
    this.adults--;
    this.totalGuest()
  }

  incrementChildren(){
    this.children++;
    this.totalGuest()
  }
  reduceChildren(){
    if(this.children < 1) return;
    this.children--;
    this.totalGuest()
  }

  showLocationList(){
    this.inputFocusMaxGuest = false;
  }

  showMaxGuest(){
    this.inputFocusMaxGuest = true;
  }

  totalGuest(){
    this.maxGuest = this.adults + this.children;
    if(this.maxGuest > 0){
      this.searchForm.controls['maxGuests'].setValue(this.maxGuest);
    }else{
      this.searchForm.controls['maxGuests'].setValue('');
    }
  }

}
