import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public formError: Boolean;
  public formSubmitAttempt: Boolean;
  id: number;
  post: any = {};
  loading = false;
  error: string;
  postForm: FormGroup;

  createPost =  gql`mutation createBlog($postData: PostInput) {
      createPost(postData: $postData) {
        postText
        title
        _id
    }
  }`

  updatePost = gql`
    mutation updateBlog($id: String!, $postData: PostInput) {
      updatePost(_id:$id,  postData: $postData) {
        postText
        title
        _id
    }
  }
  `

  constructor(private userService : UserService, private activateRoute: ActivatedRoute, private apollo: Apollo,
    private fb: FormBuilder,private router: Router){
    this.id = this.activateRoute.snapshot.params['id'];
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
                  isAdmin,
                  photo
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
    this.formError = false;
    this.formSubmitAttempt = false;
    if (this.postForm.valid) {
      try {
        const title = this.postForm.get('title').value;
        const postText = this.postForm.get('postText').value;
        if (this.id) {
          this.apollo.mutate({
            mutation: this.updatePost,
            variables: {
              id: this.id,
              postData: {
                title: title,
                postText: postText
              }
            }
          }).subscribe(({ data }) => {
            this.router.navigate(['/posts/post', data['updatePost']['_id']]);
          },(error) => {
            console.log('There was an error sending the query', error);
          });
        } else {
          this.apollo.mutate({
            mutation: this.createPost,
            variables: {
              postData: {
                title: title,
                postText: postText
              }
            }
          }).subscribe(({ data }) => {
            this.router.navigate(['/posts/post', data['createPost']['_id']]);
          },(error) => {
            console.log('There was an error sending the query', error);
          });
        }


      } catch (err) {
        this.formError = true;
        console.log(err)
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
