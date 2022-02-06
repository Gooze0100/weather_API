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
  protected _currentWeatherDataSubscription: Subscription;
  protected _dailyWeatherDataSubscription: Subscription;
  protected _logConditionsSubscription: Subscription;
  public currentWeatherData: Array<Current> = [];
  public dailyWeatherData: Array<Daily> = [];
  public locationName: string = '';

  constructor(
    protected route: ActivatedRoute,
    private locationSearchedService: LocationResultsService,
    private logUserDataService: LogUserService
  ) {}

  /**
   * Returns weekday in string type.
   * @param {string} date need to give date in string type.
   */
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
    this._currentWeatherDataSubscription = this.locationSearchedService
      .getCurret(this.route.snapshot.params['id'])
      .subscribe(
        (res) => {
          this.currentWeatherData = res;
          this.locationName = this.route.snapshot.params['name'];
          const data = JSON.stringify(res);
          const timestamp = JSON.stringify(Date.now());
          this._logConditionsSubscription = this.logUserDataService
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

    this._dailyWeatherDataSubscription = this.locationSearchedService
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
    this._logConditionsSubscription.unsubscribe();
    this._currentWeatherDataSubscription.unsubscribe();
    this._dailyWeatherDataSubscription.unsubscribe();
  }
}
