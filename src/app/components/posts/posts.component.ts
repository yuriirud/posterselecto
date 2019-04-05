import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FetchService } from 'src/app/fetch.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  subscriptionPosts: Subscription;
  allPosts:any = [];
  p: number = 1;
  constructor(private fetch: FetchService) { }

  ngOnInit() {
    this.subscriptionPosts = this.fetch.fetchPosts().subscribe(posts => {
      this.allPosts = posts;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionPosts.unsubscribe();
  }

}
