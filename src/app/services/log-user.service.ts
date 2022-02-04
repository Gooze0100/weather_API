import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LogUserService {
  constructor(private http: HttpClient) {}

  logKeywords(keyword: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // gali reiketi naudoti GET request nes neveike post
    return this.http
      .post(`http://localhost:3000/keywords/save/${keyword}`, {
        headers: headers,
      })
      .pipe(map((res) => res.toString()));
  }

  logConditions(condition: string, timestamp: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // gali reiketi naudoti GET request nes neveike post
    return this.http
      .post(`http://localhost:3000/conditions/save/${condition}/${timestamp}`, {
        headers: headers,
      })
      .pipe(map((res) => res.toString()));
  }

  getAllKeywords() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // gali reiketi naudoti GET request nes neveike post
    return this.http
      .post(`http://localhost:3000/keywords`, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          console.log(res);
        })
      );
  }

  getAllConditions() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // gali reiketi naudoti GET request nes neveike post
    return this.http
      .post(`http://localhost:3000/conditions`, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          console.log(res);
        })
      );
  }
}
