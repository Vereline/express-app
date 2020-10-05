import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { UserService } from 'src/app/services/user/user.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import gql from "graphql-tag";
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill'
import 'quill-emoji/dist/quill-emoji.js'
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
  selectedImage: File = null;
  modules = {}
  content=""
  blured = false;
  focused = false;

  createPost =  gql`mutation createBlog($postData: PostInput) {
      createPost(postData: $postData) {
        postText
        title
        _id
        image
    }
  }`

  updatePost = gql`
    mutation updateBlog($id: String!, $postData: PostInput) {
      updatePost(_id:$id,  postData: $postData) {
        postText
        title
        _id
        image
    }
  }
  `

  constructor(private userService : UserService, private activateRoute: ActivatedRoute, private apollo: Apollo,
    private fb: FormBuilder, private router: Router, private postService: PostsService){
    this.id = this.activateRoute.snapshot.params['id'];
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video'],                         // link and image, video
        ['emoji']

      ]
    }
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
            this.content = data.post.postText;
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
        let postData = {
          title: title,
          postText: postText,
        }
        if (this.selectedImage) {
          postData["image"] = this.selectedImage;
        }
        // console.log(postData)
        if (this.id) {
          this.apollo.mutate({
            mutation: this.updatePost,
            variables: {
              id: this.id,
              postData: postData,
              context: {
                useMultipart: true
             }
            }
          }).subscribe(({ data }) => {
            // console.log( data )
            if (this.selectedImage) {
              this.postService.updatePostImage(data['updatePost']['_id'], this.selectedImage).subscribe(({ newData }) =>{
                console.log(newData)
              })
            }
            this.router.navigate(['/posts/post', data['updatePost']['_id']]);
          },(error) => {
            console.log('There was an error sending the query', error);
          });
        } else {
          this.apollo.mutate({
            mutation: this.createPost,
            variables: {
              postData: postData,
              context: {
                useMultipart: true
             }
            }
          }).subscribe(({ data }) => {
            if (this.selectedImage){
              this.postService.updatePostImage(data['createPost']['_id'], this.selectedImage).subscribe(({ newData }) => {
                console.log(newData)
              })
            }
            this.router.navigate(['/posts/post', data['createPost']['_id']]);
          },(error) => {
            console.log('There was an error sending the query', error);
          });
        }
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

  // Quill editor methods
  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blured = false;
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event);
    this.focused = false;
    this.blured = true;
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  addBindingCreated(quill) {
    quill.keyboard.addBinding({
      key: 'b'
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING B', range, context)
    });

    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING SHIFT + B', range, context)
    });
  }

}
