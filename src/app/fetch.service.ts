import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { forkJoin } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  //fetch all posts
  fetchPosts() {
    return this.http.get(`${this.baseUrl}posts`).pipe(
      map((resp: any) => {
        return resp.map((post: any) => {
          return {
            id: post.id,
            title: post.title,
            userID: post.userId
          }
        })
      })
    )
  }

  //get info about author + his posts
  fetchAuthorWithPosts(id) {
    let author = this.http.get(`${this.baseUrl}users/${id}`).pipe(
      map((resp: any) => {
        return {
          id: resp.id,
          name: resp.name,
          username: resp.username,
          email: resp.email,
          address: {
            street: resp.address.street,
            city: resp.address.city
          },
          phone: resp.phone,
          website: resp.website
        }
      })
    );
    let posts = this.http.get(`${this.baseUrl}posts?userId=${id}`).pipe(
      map((resp: any) => {
        return resp.map((post: any) => {
          return {
            id: post.id,
            title: post.title,
            userID: post.userId
          }
        })
      })
    );
    return forkJoin([author, posts]);
  }
  
  //get post with comments, obviously
  fetchPostWithComment(id) {
    let post = this.http.get(`${this.baseUrl}posts/${id}`).pipe(
      map((post: any) => {
        return {
          id: post.id,
          title: post.title,
          userID: post.userId,
          body: post.body
        }
      })
    );
    let comments = this.http.get(`${this.baseUrl}comments?postId=${id}`).pipe(
      map((resp: any) => {
        return resp.map((comment: any) => {
          return {
            postID: comment.postId,
            id: comment.id,
            name: comment.name,
            email: comment.email,
            body: comment.body
          }
        })
      })
    );
    return forkJoin([post, comments]);
  }
}
