import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LogUserService {
  country: string;
  constructor(private http: HttpClient) {}

  /**
   * Uses saves Keywords of searched locations in MongoDB.
   * @param {string} keyword string from search input.
   * pipe is used with map to get result from node.js band-end.
   */
  logKeywords(keyword: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(`http://localhost:3000/keywords/save/${keyword}`, {
        headers: headers,
      })
      .pipe(map((res) => console.log(res)));
  }

  /**
   * Saves current weather conditions with timestamp for selected location in MongoDB.
   * @param {string} condition got from http service with information about current weather condition.
   * @param {string} timestamp date when location was selected.
   * pipe is used with map to get result from node.js band-end.
   */
  logConditions(condition: string, timestamp: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(`http://localhost:3000/conditions/save/${condition}/${timestamp}`, {
        headers: headers,
      })
      .pipe(map((res) => console.log(res)));
  }

  /**
   * Get's all keywords from MongoDB with HTTP request
   */
  getAllKeywords() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(`keywords`, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          console.log(res);
        })
      );
  }

  /**
   * Get's all conditions with timestamps from MongoDB with HTTP request
   */
  getAllConditions() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(`conditions`, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          console.log(res);
        })
      );
  }
}
