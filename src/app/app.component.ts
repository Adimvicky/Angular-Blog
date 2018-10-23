import { Component } from '@angular/core';
import { PostService } from './services/post.service';
import { Post } from './services/Post';

@Component({
  selector: 'my-app',
  template: `
  
  <div class="container">
  <h1 class="text-center">My Angular Blog</h1>
  <br>
  <form class="jumbotron" (submit)='addPost($event)'>
   <input class="form-control" [(ngModel)]="title" name='title' type='text' placeholder='post title'>
    <br><br>
   <textarea class="form-control" [(ngModel)]="body" name='body' placeholder='post body'></textarea>
    <br><br>
   <input class="btn btn-primary btn-block" type="submit" value='Submit'>
  </form>
  <br><br>
    <div>
     <div *ngFor='let post of posts' class="panel">
      <h3>{{post.title}}</h3>
      <p>{{post.body}}</p>
     </div>
    </div>
    </div>
  `,
  providers : [PostService]
})

export class AppComponent  { 
  posts : Post[];
  title : string;
  body : string;

  constructor(private _postService : PostService){
     this._postService.getPosts().subscribe(posts => {
       this.posts = posts;
    })
  } 

  addPost(event){
    event.preventDefault();

    var newPost = {
      title : this.title,
      body : this.body
    }

    this._postService.addPost(newPost).subscribe(post => {
      this.posts.unshift(post);
      this.title = "";
      this.body = "";
    });
    return false;
  }
}
 