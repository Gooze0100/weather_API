import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'JavaScript internship';
  countries: Object[] = [];
  forwardData($event) {
    this.countries = $event;
  }
}
