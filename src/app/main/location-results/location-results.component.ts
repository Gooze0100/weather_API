import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrls: ['./location-results.component.scss'],
})
export class LocationResultsComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit(): void {}
}
