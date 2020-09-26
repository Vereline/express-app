import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public user: any = {};
  public isAdmin: Boolean;
  userForm: FormGroup;

  constructor(private userService : UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.userIsAdmin().subscribe((isAdmin : boolean) => {
      this.isAdmin = isAdmin;
    });
    
    this.userService.getUserData().subscribe((data : any) => {
      this.user = data.user;
    });

    this.userForm = this.fb.group({
      email: ['', Validators.email],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
    },);

  }

  onSubmit() {

  }

}
