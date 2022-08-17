import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Stays } from 'src/app/interfaces/stays';

import { HeaderComponent } from '../../shared/header/header.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {
  @Input() staysArray!: Stays[]; 

  constructor() { }

  ngOnInit(): void {
  }
}
