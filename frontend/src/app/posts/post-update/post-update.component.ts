import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { UserService } from 'src/app/services/user/user.service';
import gql from "graphql-tag";

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent implements OnInit {

  public isAdmin: Boolean;
  id: number;
  post: any = {};
  loading = false;
  error: string;
  postForm: FormGroup;

  constructor(private userService : UserService, private activateRoute: ActivatedRoute, private apollo: Apollo,
    private fb: FormBuilder){
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userService.userIsAdmin().subscribe((isAdmin : boolean) => {
      this.isAdmin = isAdmin;
    });

    this.postForm = this.fb.group({
      title: ['', Validators.required],
      postText: ['', Validators.required]
    });

    if (this.id){
      this.error = "";
      this.loading = true;
      this.apollo
        .query<any>({
          query: gql`
            query getPost($id: String!) {
              post(_id: $id) {
                _id,
                postText,
                title,
                    author {
                  _id,
                  firstName,
                  lastName,
                  email,
                  isAdmin
                },
                comments {
                  _id
                },
                createdAt,
                updatedAt,
                image
              }
            }
          `,
          variables: {
            id: this.id
          }
        })
        .subscribe(({ data, loading }) => {
          if (data.post) {
            this.post = data.post;
          }
          else {
            this.error = "Post does not exist";
          }
          this.loading = loading;
        });
    }
  }

  onSubmit() {
    
  }
}
