import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getRecord() {
    return this.http.get('https://p8iyqk0j8h.execute-api.us-east-1.amazonaws.com/dev/games',
      {
        headers: new HttpHeaders({
          'Authorization': this.authService.idToken,
          'Content-Type': 'application/json'
        })
      })
  }

  saveRecord(winner: string) {
    const requestBody = {
      'winner': winner
    }
    this.http.post('https://p8iyqk0j8h.execute-api.us-east-1.amazonaws.com/dev/games', requestBody,
      {
        headers: new HttpHeaders({
          'Authorization': this.authService.idToken,
          'Content-Type': 'application/json'
        })
      }).subscribe(response => {
        console.log(response)
      })
  }
}