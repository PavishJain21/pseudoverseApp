import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponent } from '../app.component';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.page.html',
  styleUrls: ['./reply.page.scss'],
})
export class ReplyPage implements OnInit {
  firestore = new FirebaseTSFirestore();
  comments: Comment [] = [];
  @Input() postId:string='';
  @Output() isCommented=new EventEmitter<boolean>();
  replyContent:string='';
  constructor() { }

  ngOnInit(): void {
    
  }

  isCommentCreator(comment: Comment){
    try {
      return comment.creatorId == AppComponent.getUserDocument().userId;
    } catch (err) {
      return 0;
    }
  }

  onSendClick(){
    if(!(this.replyContent?.length > 0)) return;
    this.firestore.create(
      {
        path: ["Posts", this.postId, "PostComments"],
        data: {
          comment:this.replyContent,
          creatorId: AppComponent.getUserDocument().userId,
          creatorName: AppComponent.getUserDocument().publicName,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
         this.replyContent = "";
         this.isCommented.emit(true);
        }
      }
    );
  }
}
export interface Comment {
  creatorId: string;
  creatorName: string;
  comment: string;
  timestamp: firebase.default.firestore.Timestamp
}

