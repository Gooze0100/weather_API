import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Countries } from 'src/app/models/countries.model';
import { AvailableLocationsService } from 'src/app/services/available-locations.service';

@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrls: ['./location-results.component.scss'],
})
export class LocationResultsComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription;
  private routeChangeSubscription: Subscription;
  public allData: Array<Countries>;
  public title: string = '';
  public locationsFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private availableLocationsService: AvailableLocationsService
  ) {}

  ngOnInit(): void {
    this.routeChangeSubscription = this.route.params.subscribe((params) =>
      this.handleRouteChange(params)
    );
  }

  /**
   * @param {string} params gives number to specific locations by id.
   * Using subscription to get data from availableLocationsService, changing locationFound:boolean and title text.
   */
  handleRouteChange(params) {
    this.dataSubscription = this.availableLocationsService
      .availableLocations(params['id'])
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.allData = data;
            this.locationsFound = true;
            this.title = 'Locations found:';
          } else {
            this.locationsFound = false;
            this.title = 'Location not found';
          }
        },
        (err) => {
          throw new Error(err);
        }
      );
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.routeChangeSubscription.unsubscribe();
  }
}
