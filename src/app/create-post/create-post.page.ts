import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  selectedImageFile :File;
  postContent:string='';
  selectedCategory:string='';
  auth = new FirebaseTSAuth();
  category:Category[]=[];
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  constructor(private router:Router,private location:Location) { }

  ngOnInit(): void {
    this.getCategory();
  }

  onPostClick() {
    let comment = this.postContent;
    if(comment.length <= 0 ) return;
    if(this.selectedImageFile) {
      this.uploadImagePost(comment);
    } else {
    this.uploadPost();
    }
   
  }

  getCategory(){
    this.firestore.getCollection(
      {
        path: ["Category"],
        where: [
        ],
        onComplete: (result) => {
          result.docs.forEach(
            doc => {
              let category = <Category>doc.data();
              category.Id = doc.id;
              this.category.push(category);
            }
          );
        },
        onFail: err => {

        }
      }
    );
  }

  back(){
    this.location.back();
  }
  uploadImagePost(comment: string){
    let postId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          this.firestore.create(
            {
              path: ["Posts", postId],
              data: {
                comment: comment,
                creatorId: this.auth.getAuth().currentUser.uid,
                imageUrl: downloadUrl,
                category:this.selectedCategory,
                timestamp: FirebaseTSApp.getFirestoreTimestamp(),
              },
              onComplete: (docId) => {
                this.router.navigate(['/postfeed'])
              }
            }
          );
        }
      }
    );
  }

  uploadPost(){
    this.firestore.create(
      {
        path: ["Posts"],
        data: {
          comment: this.postContent,
          creatorId: this.auth.getAuth().currentUser.uid,
          category:this.selectedCategory,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          this.postContent='';
          this.router.navigate(['/postfeed']);
        }
      }
    );
  }

  onPhotoSelected(photoSelector: any) {
    this.selectedImageFile = photoSelector.files[0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
      }
    );
  }
}

export interface Category {
  Id:string;
  Name:string;
  Value:string;
  }
  
