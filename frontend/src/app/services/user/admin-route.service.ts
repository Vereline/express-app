import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { UserService } from './user.service';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AdminRouteService implements CanActivate {
  constructor(public auth: UserService, public router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.isAdmin === true
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}