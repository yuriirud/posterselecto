import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchService } from 'src/app/fetch.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  postBody:any = {};
  postComments:any = [];
  postSubscription: Subscription;
  error = false;
  constructor(private route: ActivatedRoute, private fetch: FetchService, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.postSubscription = this.fetch.fetchPostWithComment(id).subscribe(post => {
      [this.postBody, this.postComments] = post;
      console.log(this.postBody);
      console.log(this.postComments);
    },
    error => {
      this.error = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000); 
    }
    );
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}
