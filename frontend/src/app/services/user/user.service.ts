import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'http://localhost:3005';
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

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

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserClaims(){
   return this.http.get(this.rootUrl+'/api/GetUserClaims');
  }
}
