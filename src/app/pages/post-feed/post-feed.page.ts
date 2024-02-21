import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.page.html',
  styleUrls: ['./post-feed.page.scss'],
})
export class PostFeedPage implements OnInit {
  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];
  auth = new FirebaseTSAuth();

  constructor(private dialog: MatDialog,private router:Router,private ngNavigatorShareService: NgNavigatorShareService,
    private location:Location) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onLogoutClick(){
   this.auth.signOut();
   this.router.navigate(['/login']);
  }

  onLogin(){
    this.router.navigate(['/login']);
  }

  onCreatePostClick(){
    //this.dialog.open(CreatePostComponent);
  }
  back(){
   this.location.back();
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
  
  onSearch($event){
    this.getPostsByCategory($event.detail.value);
  }

  getPostsByCategory(category: string){
    this.firestore.getCollection(
      {
        path: ["Posts"],
        where: [
          new Where("category","==",category),
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
  
}

export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl?: string;
  postId: string;
  category?:string;
}

