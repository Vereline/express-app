import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public user: any = {};
  public isAdmin: Boolean;
  public formError: Boolean;
  public formSubmitAttempt: Boolean;
  userForm: FormGroup;
  selectedImage: File = null;

  constructor(private userService : UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.userIsAdmin().subscribe((isAdmin : boolean) => {
      this.isAdmin = isAdmin;
    });
    
    this.userService.getUserData().subscribe((data : any) => {
      this.user = data.user;
      localStorage.setItem("firstName", data.user.firstName)
      localStorage.setItem("lastName", data.user.lastName)
      localStorage.setItem("email", data.user.email)
      localStorage.setItem("id", data.user._id)
    });

    this.userForm = this.fb.group({
      email: ['', Validators.email],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
    },);

  }

  onSubmit() {
    this.formError = false;
    this.formSubmitAttempt = false;
    if (this.userForm.valid) {
      try {      
        const data = {
          email:  this.userForm.get('email').value,
          firstName: this.userForm.get('firstName').value,
          lastName: this.userForm.get('lastName').value,
          birthDate: this.userForm.get('birthDate').value,
        }
        this.userService.updateUserData(data, this.selectedImage).subscribe((data : any) => {
          this.user = data.user;
        }, (err : HttpErrorResponse) => {
          this.formError = true;
          this.formSubmitAttempt = true;
        });
      } catch (err) {
        this.formError = true;
        console.log(err);
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  onFileSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }

  getDetaultPhoto() {
    return 'assets/images/user-default.png';
  }
}
