import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Current } from 'src/app/models/curret.model';
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
  // public dataC = [
  //   {
  //     time: '2022-02-04T13:12Z',
  //     symbol: 'd300',
  //     symbolPhrase: 'cloudy',
  //     temperature: 6,
  //     feelsLikeTemp: 2,
  //     relHumidity: 64,
  //     dewPoint: 0,
  //     windSpeed: 27,
  //     windDir: 286,
  //     windDirString: 'W',
  //     windGust: 52,
  //     precipProb: 56,
  //     precipRate: 0,
  //     cloudiness: 78,
  //     thunderProb: 0,
  //     uvIndex: 1,
  //     pressure: 1010.92,
  //     visibility: 10230,
  //   },
  // ];
  // public dataD = [
  //   {
  //     date: '2022-02-04',
  //     symbol: 'd300',
  //     maxTemp: 0,
  //     minTemp: -7,
  //     precipAccum: 2.64,
  //     maxWindSpeed: 7,
  //     windDir: 161,
  //   },
  //   {
  //     date: '2022-02-05',
  //     symbol: 'd431',
  //     maxTemp: 3,
  //     minTemp: -1,
  //     precipAccum: 7.38,
  //     maxWindSpeed: 6,
  //     windDir: 170,
  //   },
  //   {
  //     date: '2022-02-06',
  //     symbol: 'd421',
  //     maxTemp: 3,
  //     minTemp: 0,
  //     precipAccum: 2.42,
  //     maxWindSpeed: 8,
  //     windDir: 202,
  //   },
  //   {
  //     date: '2022-02-07',
  //     symbol: 'd411',
  //     maxTemp: 3,
  //     minTemp: 0,
  //     precipAccum: 0.92,
  //     maxWindSpeed: 5,
  //     windDir: 322,
  //   },
  //   {
  //     date: '2022-02-08',
  //     symbol: 'd421',
  //     maxTemp: 3,
  //     minTemp: 0,
  //     precipAccum: 3.44,
  //     maxWindSpeed: 5,
  //     windDir: 188,
  //   },
  //   {
  //     date: '2022-02-09',
  //     symbol: 'd210',
  //     maxTemp: 5,
  //     minTemp: 1,
  //     precipAccum: 1.52,
  //     maxWindSpeed: 6,
  //     windDir: 215,
  //   },
  //   {
  //     date: '2022-02-10',
  //     symbol: 'd320',
  //     maxTemp: 5,
  //     minTemp: 1,
  //     precipAccum: 6.8,
  //     maxWindSpeed: 7,
  //     windDir: 231,
  //   },
  // ];
  constructor(
    private route: ActivatedRoute,
    private locationSearchedService: LocationResultsService,
    private logUserDataService: LogUserService
  ) {}

  ngOnInit(): void {
    // padaryti priskytima duomenu kaip ir location services ir tada destroyinti data
    // this.data = this.availableLocationsService.data.subscribe
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
