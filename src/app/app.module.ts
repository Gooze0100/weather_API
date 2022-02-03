import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './menu/input/input.component';
import { FormsModule } from '@angular/forms';
import { SearchedLocationsComponent } from './main/searched-locations/searched-locations.component';
import { LocationResultsComponent } from './main/location-results/location-results.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    SearchedLocationsComponent,
    LocationResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
