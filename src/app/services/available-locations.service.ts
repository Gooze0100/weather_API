import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Countries {
  adminArea: string;
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  timezone: string;
}

@Injectable({
  providedIn: 'root',
})
export class AvailableLocationsService {
  constructor(private http: HttpClient) {}

  private options = {
    method: 'GET',
    params: { lang: 'en' },
    headers: {
      'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
      'x-rapidapi-key': 'e0a5c4f116mshab070df83e65e2cp116f3ajsn0c48f01e48db',
    },
  };

  availableLocations(location: string) {
    return this.http
      .get(
        `https://foreca-weather.p.rapidapi.com/api/v1/location/search/${location}`,
        this.options
      )
      .pipe(
        map((resData: object) => {
          const data: Countries[] = [];
          for (const key in resData) {
            for (let i = 0; i < 5; i++) {
              data.push(resData[key][i]);
            }
            // data.push(...resData[key]);
          }
          return data;
        })
      );
  }
}
