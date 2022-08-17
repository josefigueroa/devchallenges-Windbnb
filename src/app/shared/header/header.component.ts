import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Stays } from 'src/app/interfaces/stays';
import { StaysService } from 'src/app/service/stays.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  searchForm = this.fb.group({
    location: ['', Validators.required],
    guest: ['']
  });

  stays: Stays[] = [];

  constructor(private fb: FormBuilder, 
              private staysService: StaysService) { }

  ngOnInit(): void {
    this.getStays();
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

  searchFormSubmit() {
    console.log(this.searchForm.value);
    this.hideMenu();
  }

  getStays(): void {
    this.staysService.getStays()
      .subscribe(stay => this.stays = stay );
  }

}
