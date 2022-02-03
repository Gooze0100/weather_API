import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AvailableLocationsService } from 'src/app/services/available-locations.service';

@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrls: ['./location-results.component.scss'],
})
export class LocationResultsComponent implements OnInit, OnDestroy {
  private data: Subscription;
  public allData: any;

  constructor(
    // private route: ActivatedRoute,
    private availableLocationsService: AvailableLocationsService
  ) {}

  ngOnInit(): void {
    this.data = this.availableLocationsService.data.subscribe((data) => {
      console.log(data);
      this.allData = data;
    });
  }
  ngOnDestroy(): void {
    this.data.unsubscribe();
  }
}
