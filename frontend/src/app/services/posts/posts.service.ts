import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  readonly rootUrl = 'http://localhost:3005';
  
  constructor(private http: HttpClient) { }

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

  updatePostImage(postId, image) {
    const token = localStorage.getItem('token');
    const fd  = new FormData();
    if (image) {
      fd.append('image', image, image.name)
    }
    var reqHeader = new HttpHeaders({'Authorization': 'JWT ' + token });
    return this.http.patch(this.rootUrl +'/api/posts/' + postId, fd, {headers: reqHeader});
  }
}
