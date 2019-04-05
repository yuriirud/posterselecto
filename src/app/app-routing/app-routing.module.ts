import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from '../components/author/author.component';
import { PostComponent } from '../components/post/post.component';
import { PostsComponent } from '../components/posts/posts.component';
import { Error404Component } from '../components/error404/error404.component';
  const routes: Routes = [
      {
          path: '',
          component: PostsComponent,
      },
      {
        path: 'author/:id',
        component: AuthorComponent
      },
      {
        path: 'post/:id',
        component: PostComponent
      },
      { 
        path: '**', 
        component: Error404Component
      }
    ];

  @NgModule({
      imports: [
          RouterModule.forRoot(routes)
      ],
      exports: [
          RouterModule
      ],
      declarations: []
    })
export class AppRoutingModule { }
    
