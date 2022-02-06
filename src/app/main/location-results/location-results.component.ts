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
  public allData: Array<Countries>;
  public title: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private availableLocationsService: AvailableLocationsService
  ) {}

  ngOnInit(): void {
    this.dataSubscription = this.availableLocationsService
      .availableLocations(this.route.snapshot.params['id'])
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.title = true;
            this.allData = data;
          } else {
            this.title = false;
          }
        },
        (err) => {
          throw new Error(err);
        }
      );
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
