import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL: string = "http://localhost:3000/api/auth/";

  constructor(private http: HttpClient) { }

  login(LoginUser:LoginUser): Observable<LoginUser>{
    return this.http.post<LoginUser>(this.URL+"login",LoginUser).pipe();
  }
}
