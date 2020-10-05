import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { User } from 'src/app/services/user/user.model';
import { CustomErrorStateMatcher } from './error-matcher';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  faGithub = faGithub;

  signupForm: FormGroup;
  public isSignupError: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  matcher = new CustomErrorStateMatcher();

  constructor(private userService : UserService, private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute) { }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirmation').value;
  
    return pass === confirmPass ? null : { notSame: true }     
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/user';

    this.signupForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
    }, {validator: this.checkPasswords });
  }

  onSubmit() {
    this.isSignupError = false;
    this.formSubmitAttempt = false;
    if (this.signupForm.valid) {
      try {
        const user: User = {
          email: this.signupForm.get('email').value, 
          password: this.signupForm.get('password').value, 
          firstName: this.signupForm.get('firstName').value, 
          lastName: this.signupForm.get('lastName').value, 
          birthDate: this.signupForm.get('birthDate').value,
        };
        this.userService.userRegistration(user).subscribe((data : any) => {
          localStorage.setItem("token", data["token"]);
          this.router.navigate([this.returnUrl]);
        }, (err : HttpErrorResponse) => {
          this.isSignupError = true;
          this.formSubmitAttempt = true;
        });
      } catch (err) {
        this.isSignupError = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
 }
}
