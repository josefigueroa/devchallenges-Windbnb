import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { PointSeparatorPipe } from './pipe/point-separator.pipe';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { UniquePipe } from './pipe/unique.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PointSeparatorPipe,
    UniquePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
