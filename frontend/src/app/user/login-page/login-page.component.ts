import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  faGithub = faGithub;
  
  isLoginError : boolean = false;
  
  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(userName, password){
    this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     this.router.navigate(['/home']);
   },
   (err : HttpErrorResponse)=>{
     this.isLoginError = true;
   });
 }

}
