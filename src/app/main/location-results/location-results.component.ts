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
  private dataSubscription: Subscription;
  public allData: any;

  constructor(
    private route: ActivatedRoute,
    private availableLocationsService: AvailableLocationsService
  ) {}

  ngOnInit(): void {
    console.log(this.route.root);

    this.dataSubscription = this.availableLocationsService.data.subscribe(
      (data) => {
        console.log(data);
        this.allData = data;
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
