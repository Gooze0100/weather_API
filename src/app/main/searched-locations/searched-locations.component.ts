import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Current } from 'src/app/models/curret.model';
import { Daily } from 'src/app/models/daily.model';
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
  private logConditionsSubscription: Subscription;
  public currentWeatherData: Array<Current> = [];
  public dailyWeatherData: Array<Daily> = [];

  constructor(
    private route: ActivatedRoute,
    private locationSearchedService: LocationResultsService,
    private logUserDataService: LogUserService
  ) {}

  getWeekday(date: string): string {
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const d = new Date(date);
    const day = weekday[d.getDay()];
    return day;
  }

  ngOnInit(): void {
    this.currentWeatherDataSubscription = this.locationSearchedService
      .getCurret(this.route.snapshot.params['id'])
      .subscribe(
        (res) => {
          this.currentWeatherData = res;
          const data = JSON.stringify(res);
          const timestamp = JSON.stringify(Date.now());
          this.logConditionsSubscription = this.logUserDataService
            .logConditions(data, timestamp)
            .subscribe(
              () => {},
              (err) => {
                throw new Error(err);
              }
            );
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
    this.logConditionsSubscription.unsubscribe();
    this.currentWeatherDataSubscription.unsubscribe();
    this.dailyWeatherDataSubscription.unsubscribe();
  }
}

// "outputPath": "dist/meanStack",
