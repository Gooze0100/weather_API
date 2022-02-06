import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Current } from '../models/curret.model';
import { Daily } from '../models/daily.model';

@Injectable({
  providedIn: 'root',
})
export class LocationResultsService {
  constructor(protected http: HttpClient) {}

  protected optionsCurrent: Object = {
    params: {
      alt: '0',
      tempunit: 'C',
      windunit: 'MS',
      lang: 'en',
    },
    headers: {
      'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
      'x-rapidapi-key': 'b0e243c22amsh47a6ae9176f0277p1f9d4bjsn1e99c968a794',
    },
  };
  protected optionsDaily: Object = {
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

  /**
   * Returns data got from http request.
   * @param {string} location gives number to specific locations by id.
   * pipe is used with map to get current weather conditions for selected location
   */
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

  /**
   * Returns data got from http request.
   * @param {string} location gives number to specific locations by id.
   * pipe is used with map to get 7 days forecast.
   */
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
