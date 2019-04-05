import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchService } from 'src/app/fetch.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {
  authorSub: Subscription;
  author:any = {address:{}};
  authorPosts:any = [];
  error = false;

  constructor(private route: ActivatedRoute, private fetch: FetchService, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.authorSub = this.fetch.fetchAuthorWithPosts(id).subscribe(authorData => {
      [this.author, this.authorPosts] = authorData;
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
    this.authorSub.unsubscribe();
  }

}
