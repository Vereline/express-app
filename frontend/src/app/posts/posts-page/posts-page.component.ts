import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  public isAdmin: Boolean;
  public loading: Boolean;
  public posts: any[];

  constructor(private userService : UserService, private apollo: Apollo) { }

  ngOnInit(): void {
    this.userService.userIsAdmin().subscribe((isAdmin : boolean) => {
      this.isAdmin = isAdmin;
    });

    this.apollo
      .query<any>({
        query: gql`{
            posts {
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
                _id
              },
              createdAt,
              updatedAt,
              image
            }
          }
        `
      })
      .subscribe(
        ({ data, loading }) => {
          this.posts = data && data.posts;
          this.loading = loading;
        }
      );
  }

}
