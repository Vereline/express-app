import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { UserService } from 'src/app/services/user/user.service';
import gql from "graphql-tag";
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  
  public isAdmin: Boolean;
  public formError: Boolean;
  public formSubmitAttempt: Boolean;
  postId: string;
  userId: string;
  post: any = {};
  comments: any[] = [];
  loading = false;
  error: string;
  commentForm: FormGroup;

  firstName: string;
  lastName: string;
  feedback: string;

  createComment =  gql`mutation createBlogComment($commentData: CommentInput) {
      createComment(commentData: $commentData) {
        _id,
        text,
        post {
          _id
        },
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
    }
  }`


  constructor(private userService : UserService, private activateRoute: ActivatedRoute, private apollo: Apollo,
     private fb: FormBuilder, private webSocketService: WebSocketService){
    this.postId = this.activateRoute.snapshot.params['id'];
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
              isAdmin,
              photo
            },
            comments {
              _id,
              text,
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
          if (this.post.comments){
            this.comments = this.post.comments; 
          }
        }
        else {
          this.error = "Post does not exist";
        }
        this.loading = loading;
      });

      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
      this.userId = localStorage.getItem("id");

      this.webSocketService.listen('typing').subscribe((data) => this.updateFeedback(data));
      this.webSocketService.listen('spreadComment').subscribe((data) => this.addComment(data));
  }

  onSubmitComment() {
    this.formError = false;
    this.formSubmitAttempt = false;
    if (this.commentForm.valid) {
      try {
        const text = this.commentForm.get('text').value;
        this.apollo.mutate({
          mutation: this.createComment,
          variables: {
            commentData: {
              text: text,
              post: this.postId,
              author: this.userId,
            }
          }
        }).subscribe(({ data }) => {
          // this.comments.push(data['createComment'])
          console.log(data['createComment']);
          this.webSocketService.emit('sendComment', data);  
        },(error) => {
          console.log('There was an error sending the query', error);
        });
      } catch (err) {
        this.formError = true;
        console.log(err)
      }
    }
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', `${this.firstName} ${this.lastName}`);    
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a comment`;
  }

  addComment(data: any) {
    // console.log(data);
    this.comments.push(data['createComment']);
    this.feedback = '';
  }

  getDetaultPhoto() {
    return 'assets/images/user-default.png';
  }
}
