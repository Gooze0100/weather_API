import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Current } from '../models/curret.model';
import { Daily } from '../models/daily.model';

@Injectable({
  providedIn: 'root',
})
export class LocationResultsService {
  constructor(private http: HttpClient) {}

  private optionsCurrent: Object = {
    params: {
      alt: '0',
      tempunit: 'C',
      windunit: 'MS',
      tz: 'Europe/London',
      lang: 'en',
    },
    headers: {
      'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
      'x-rapidapi-key': 'e0a5c4f116mshab070df83e65e2cp116f3ajsn0c48f01e48db',
    },
  };
  private optionsDaily: Object = {
    params: {
      alt: '0',
      tempunit: 'C',
      windunit: 'MS',
      periods: '8',
      dataset: 'standard',
    },
    headers: {
      'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
      'x-rapidapi-key': 'e0a5c4f116mshab070df83e65e2cp116f3ajsn0c48f01e48db',
    },
  };

  getCurret(location: string) {
    return this.http
      .get(
        `https://foreca-weather.p.rapidapi.com/current/${location}`,
        this.optionsCurrent
      )
      .pipe(
        map((resData: Object) => {
          let data: Current[] = [];
          for (const key in resData) {
            // TODO sutvarkyti kad grazintu normaliai, gal panaudoti for of funkcija
            // console.log({ ...resData[key] });
            // data.push({ ...resData[key] });
            data = { ...resData[key] };
          }
          return data;
        })
      );
  }

  getDaily(location: string) {
    return this.http
      .get(
        `https://foreca-weather.p.rapidapi.com/forecast/daily/${location}`,
        this.optionsDaily
      )
      .pipe(
        map((resData: object) => {
          const data: Daily[] = [];
          for (const key in resData) {
            // padaryti kad pushintu ne nuo siandienos o nuo kitos
            // 2:10
            // console.log(resData[0]);

            data.push(...resData[key]);
          }
          return data;
        })
      );
  }
}
