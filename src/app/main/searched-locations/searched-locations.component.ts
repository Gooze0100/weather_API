import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Current } from 'src/app/models/curret.model';
import { LocationResultsService } from 'src/app/services/location-results.service';

@Component({
  selector: 'app-searched-locations',
  templateUrl: './searched-locations.component.html',
  styleUrls: ['./searched-locations.component.scss'],
})
export class SearchedLocationsComponent implements OnInit {
  public currentWeatherData: any[] = [];
  public dailyWeatherData: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private locationSearchedService: LocationResultsService
  ) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot.params['id']);
    this.locationSearchedService
      .getCurret(this.route.snapshot.params['id'])
      .subscribe(
        (res) => {
          // for (const key in res) {
          //   console.log(res[key]);
          // }
          console.log({ ...res });
          this.currentWeatherData = [res];
          // this.currentWeatherData = [...res];
          // this.time = { ...res };
          // this.currentWeatherData = {
          //   time: res.time,
          //   symbolPhrase: res.symbolPhrase,
          // };
          // console.log(this.currentWeatherData);
        },
        (err) => {
          throw new Error(err);
        }
      );
    // this.route.queryParams.subscribe((params) => {
    //   // console.log(params);

    //   this.currentWeatherData = params['id'];
    // });
    this.locationSearchedService
      .getDaily(this.route.snapshot.params['id'])
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          throw new Error(err);
        }
      );
  }
}
