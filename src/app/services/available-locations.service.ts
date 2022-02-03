import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Countries {
  name: string;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class AvailableLocationsService {
  private options = {
    method: 'GET',
    params: { lang: 'en' },
    headers: {
      'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
      'x-rapidapi-key': 'e0a5c4f116mshab070df83e65e2cp116f3ajsn0c48f01e48db',
    },
  };

  constructor(private http: HttpClient) {}

  availableLocations(location: string) {
    return this.http
      .get(
        `https://foreca-weather.p.rapidapi.com/api/v1/location/search/${location}`,
        this.options
      )
      .pipe(
        map((resData) => {
          const data: Countries[] = [];
          for (const key in resData) {
            data.push({ ...resData[key], id: key });
          }
          return data;
        })
      );
  }
}
