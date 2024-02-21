import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { PostData } from '../post-feed.page';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  firestore = new FirebaseTSFirestore();
  postId:any;
  comments: Comment [] = [];
  postData:any;
  constructor() {
    var post= localStorage.getItem('postData');
    if(post){
      this.postData=JSON.parse(post);
    }
   }

  ngOnInit() {
    this.getComments();
  }

  getComments(){
    this.firestore.listenToCollection(
      {
        name: "Post Comments",
        path: ["Posts", this.postData.postId, "PostComments"],
        where: [new OrderBy("timestamp", "asc")],
        onUpdate: (result)=> {
          result.docChanges().forEach(
            postCommentDoc => {
              if(postCommentDoc.type == "added") {
                this.comments.unshift(<Comment>postCommentDoc.doc.data());
              }
            }
          ); 
        }
      } 
    );
  }




  likePost(){}

  sharePost(){}

  onReplyClick(){
    //  this.dialog.open(ReplyComponent, {data: this.postData.postId});
     }
}
export interface Comment {
  creatorId: string;
  creatorName: string;
  comment: string;
  timestamp: firebase.default.firestore.Timestamp
}

