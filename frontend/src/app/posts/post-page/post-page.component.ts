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
  postId: number;
  post: any = {};
  loading = false;
  error: string;
  commentForm: FormGroup;

  userName: string;
  message: string;
  output: any[] = [];
  feedback: string;

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
        }
        else {
          this.error = "Post does not exist";
        }
        this.loading = loading;
      });

      this.webSocketService.listen('typing').subscribe((data) => this.updateFeedback(data));
      this.webSocketService.listen('chat').subscribe((data) => this.updateMessage(data));  
  }

  onSubmitComment() {

  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);    
  }

  sendMessage(): void {
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";    
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a message`;
  }
}
