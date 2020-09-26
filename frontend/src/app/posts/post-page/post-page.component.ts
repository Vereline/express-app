import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { UserService } from 'src/app/services/user/user.service';
import gql from "graphql-tag";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  
  public isAdmin: Boolean;
  postId: number;
  post: any = {};
  loading = false;
  error: string;
  commentForm: FormGroup;

  constructor(private userService : UserService, private activateRoute: ActivatedRoute, private apollo: Apollo,
     private fb: FormBuilder){
    this.postId = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userService.userIsAdmin().subscribe((isAdmin : boolean) => {
      this.isAdmin = isAdmin;
    });

    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    });

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
          id: this.postId
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

  onSubmitComment() {

  }

}
