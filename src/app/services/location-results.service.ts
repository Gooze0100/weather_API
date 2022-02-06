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
      // TODO: by persons location =================================
      tz: 'Europe/Vilnius',
      lang: 'en',
    },
    headers: {
      'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
      'x-rapidapi-key': 'b0e243c22amsh47a6ae9176f0277p1f9d4bjsn1e99c968a794',
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
      'x-rapidapi-key': 'b0e243c22amsh47a6ae9176f0277p1f9d4bjsn1e99c968a794',
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
          const data: Current[] = [];
          for (const property in resData) {
            data.push(resData[property]);
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
        map((resData: Object) => {
          const data: Daily[] = [];
          for (const property in resData) {
            for (const element of resData[property].slice(1)) {
              data.push(element);
            }
          }
          return data;
        })
      );
  }
}
