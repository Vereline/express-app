import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'http://localhost:3005';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) { }

  userRegistration(user: User) {
    const body: User = {
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      BirthDate: user.BirthDate,
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.rootUrl + '/api/signup', body, {headers : reqHeader});
  }

  userAuthentication(email, password) {
    // console.log(email, password)
    var data = { email, password };
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.rootUrl + '/api/login', data, { headers: reqHeader });
  }

  public userIsAuthenticated(): Observable<boolean> {
    return of(this.isAuthenticated());
  }

  public userIsAdmin(): Observable<boolean> {
    return of(this.isAdmin());
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin(): boolean {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    if (!this.isAuthenticated() || tokenPayload.isAdmin === false) {
      return false;
    }
    return true;
  }

  getUserData() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + token });
    return this.http.get(this.rootUrl +'/api/users/' + tokenPayload.userId, {headers: reqHeader});
  }

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
