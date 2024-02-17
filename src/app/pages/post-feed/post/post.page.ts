import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { PostData } from '../post-feed.page';
import { Router } from '@angular/router';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  @Input() postData: PostData;
  @Output() redirectToPost=new EventEmitter<any>();
  isCommentClicked=false;
  creatorName: string;
  creatorDescription: string;
  firestore = new FirebaseTSFirestore();
  constructor(private dialog: MatDialog,private router:Router,private ngNavigatorShareService:NgNavigatorShareService) { }

  ngOnInit(): void {
    this.getCreatorInfo();
  }

  onReplyClick(){
   this.isCommentClicked =!this.isCommentClicked 
  }
  isCheckCommented($event){
    this.isCommentClicked=false;
  }

  sharePost(){
    this.ngNavigatorShareService.share({
      title: 'Welcome to Pseudoverse',
      text: 'Hey, check out the pseudoverse Post',
      url: 'http://localhost:8100/'+this.router.url      
    }).then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  getCreatorInfo(){
    this.firestore.getDocument(
      {
        path: ["Users", this.postData.creatorId],
        onComplete: result => {
          let userDocument = result.data();
          this.creatorName = userDocument['publicName'];
          this.creatorDescription = userDocument['description'];
        }
      }
    );
  }
  
  likePost(){}

  postRedirection(){
    var obj = {
      userName:this.creatorName,
      content:this.postData?.comment,
      postId:this.postData.postId,
      imageUrl:this.postData?.imageUrl
    }
    var data=JSON.stringify(obj);
    this.redirectToPost.emit(data);
  }

}

