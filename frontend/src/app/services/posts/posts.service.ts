import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  public getPosts(): Observable<any> {

  }

  public getPost(postId): Observable<any> {
    
  }

  public updatePost(postId, postData): Observable<any> {
    
  }

  public createPost(postData): Observable<any> {
    
  }

  public deletePost(postId): Observable<any> {
    
  }
}
