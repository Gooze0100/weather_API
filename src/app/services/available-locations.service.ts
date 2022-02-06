import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Countries } from '../models/countries.model';

@Injectable({
  providedIn: 'root',
})
export class AvailableLocationsService {
  constructor(private http: HttpClient) {}

  private options: Object = {
    params: { lang: 'en' },
    headers: {
      'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
      'x-rapidapi-key': 'b0e243c22amsh47a6ae9176f0277p1f9d4bjsn1e99c968a794',
    },
  };

  /**
   * Returns data got from http request.
   * @param {string} location gives number to specific locations by id.
   * pipe is used with map to get just 5 locations in total.
   */
  availableLocations(location: string) {
    return this.http
      .get(
        `https://foreca-weather.p.rapidapi.com/api/v1/location/search/${location}`,
        this.options
      )
      .pipe(
        map((resData: Object) => {
          const data: Countries[] = [];
          for (const key in resData) {
            for (let i = 0; i < 5; i++) {
              if (resData[key][i]) {
                data.push(resData[key][i]);
              }
            }
          }
          return data;
        })
      );
  }
}
