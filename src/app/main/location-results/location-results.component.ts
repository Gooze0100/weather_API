import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Countries } from 'src/app/models/countries.model';
import { AvailableLocationsService } from 'src/app/services/available-locations.service';

@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrls: ['./location-results.component.scss'],
})
export class LocationResultsComponent implements OnInit, OnDestroy {
  protected _dataSubscription: Subscription;
  protected _routeChangeSubscription: Subscription;
  public allData: Array<Countries>;
  public title: string = '';
  public locationsFound: boolean = false;

  constructor(
    protected _route: ActivatedRoute,
    protected availableLocationsService: AvailableLocationsService
  ) {}

  ngOnInit(): void {
    this._routeChangeSubscription = this._route.params.subscribe(
      (params: Observable<Params>) => this._routeChangeHandler(params)
    );
  }

  /**
   * @param {string} params gives number to specific locations by id.
   * Using subscription to get data from availableLocationsService, changing locationFound:boolean and title text.
   */
  _routeChangeHandler(params: Observable<Params>) {
    this._dataSubscription = this.availableLocationsService
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
    this._dataSubscription.unsubscribe();
    this._routeChangeSubscription.unsubscribe();
  }
}
