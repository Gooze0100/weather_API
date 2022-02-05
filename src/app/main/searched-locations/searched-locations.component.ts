import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationResultsService } from 'src/app/services/location-results.service';
import { LogUserService } from 'src/app/services/log-user.service';

@Component({
  selector: 'app-searched-locations',
  templateUrl: './searched-locations.component.html',
  styleUrls: ['./searched-locations.component.scss'],
})
export class SearchedLocationsComponent implements OnInit, OnDestroy {
  private currentWeatherDataSubscription: Subscription;
  private dailyWeatherDataSubscription: Subscription;
  public currentWeatherData: any[] = [];
  public dailyWeatherData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private locationSearchedService: LocationResultsService,
    private logUserDataService: LogUserService
  ) {}

  ngOnInit(): void {
    this.currentWeatherDataSubscription = this.locationSearchedService
      .getCurret(this.route.snapshot.params['id'])
      .subscribe(
        (res) => {
          this.currentWeatherData = res;
          const data = JSON.stringify(res);
          const timestamp = JSON.stringify(Date.now());
          this.logUserDataService.logConditions(data, timestamp);
        },
        (err) => {
          throw new Error(err);
        }
      );

    this.dailyWeatherDataSubscription = this.locationSearchedService
      .getDaily(this.route.snapshot.params['id'])
      .subscribe(
        (res) => {
          this.dailyWeatherData = res;
        },
        (err) => {
          throw new Error(err);
        }
      );
  }

  ngOnDestroy(): void {
    this.currentWeatherDataSubscription.unsubscribe();
    this.dailyWeatherDataSubscription.unsubscribe();
  }
}

// "outputPath": "dist/meanStack",
