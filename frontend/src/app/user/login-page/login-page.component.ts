import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import {  HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  faGithub = faGithub;
  
  loginForm: FormGroup;
  public isLoginError: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  private token: string;

  constructor(private userService : UserService, private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute, public translate: TranslateService) { 

    }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/user';
    this.route.queryParams.subscribe(params => {
        this.token = params['token'];
    });

    if (this.token) {
      localStorage.setItem("token", this.token);
      this.router.navigate(['/user']);
    }

    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isLoginError = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      try {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;
        this.userService.userAuthentication(email, password).subscribe((data : any) => {
          localStorage.setItem("token", data["token"]);
          this.router.navigate([this.returnUrl]);
        }, (err : HttpErrorResponse) => {
          this.isLoginError = true;
          this.formSubmitAttempt = true;
        });
      } catch (err) {
        this.isLoginError = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
 }
}
