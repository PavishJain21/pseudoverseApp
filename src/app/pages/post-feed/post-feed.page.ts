import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.page.html',
  styleUrls: ['./post-feed.page.scss'],
})
export class PostFeedPage implements OnInit {
  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];
  constructor(private dialog: MatDialog,private router:Router,private ngNavigatorShareService: NgNavigatorShareService,) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onCreatePostClick(){
    //this.dialog.open(CreatePostComponent);
  }

  getPosts(){
    this.firestore.getCollection(
      {
        path: ["Posts"],
        where: [
          new OrderBy("timestamp", "desc"),
          new Limit(10)
        ],
        onComplete: (result) => {
          result.docs.forEach(
            doc => {
              let post = <PostData>doc.data();
              post.postId = doc.id;
              this.posts.push(post);
            }
          );
        },
        onFail: err => {

        }
      }
    );
  }
  
  redirect($event){
    localStorage.setItem('postData',$event);
     this.router.navigate(['postfeed/feed']);
  }


}

export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl?: string;
  postId: string;
}

