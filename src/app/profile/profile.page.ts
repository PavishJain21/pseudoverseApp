import { Component, Input, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { AppComponent, UserDocument } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId:string='';
  @Input() show: boolean;
  
  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;
  user:UserDocument;

  constructor(private router:Router) { 
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
    if(this.auth.getAuth() && this.auth.getAuth() !=null && this.auth.getAuth().currentUser)
    this.userId= this.auth.getAuth().currentUser.uid;
  }

  ngOnInit(): void {
    var user= localStorage.getItem('userInfo');
    if(user){
      this.user=JSON.parse(user);
    }
  }

  onContinueClick(
    nameInput: any,
    descriptionInput: any
  ) {
    let name = nameInput.value;
    let description = descriptionInput.value;
    if(this.user== undefined || this.user==null  ){ this.firestore.create(
      {
        path: ["Users", this.auth.getAuth().currentUser.uid],
        data: {
          publicName: name,
          description: description,
          userId:this.userId
        },
        onComplete: (docId) => {
          alert("Saved Successfully")
        },
        onFail: (err) => {
             
        }
      }
    )}
    else{
      this.firestore.update(
        {
          path: ["Users", this.auth.getAuth().currentUser.uid],
          data: {
            publicName: name,
            description: description
          },
          onComplete: (docId) => {
          },
          onFail: (err) => {
                 if(err?.toString().includes('No document to update')){
                 
                 }
          }
        }
      );
    }
  }
}


export class User{
publicName:any;
description:any;
userId:any;
}
