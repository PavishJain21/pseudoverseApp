import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { NavigationStart, Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PseudoVerse';
  isSignedIn=false;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  islogginClick=false;
  path:string='';
  private static userDocument: UserDocument;

  constructor(
      private router: Router,
      private location:Location,
    ){
    this.auth.listenToSignInStateChanges(
      user => {
        if(user==null){
          this.router.navigate(['/login'])
        }
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              this.isSignedIn=true;
            },
            whenSignedOut: user => {
              this.isSignedIn=false;
              this.router.navigate(['/login'])
              AppComponent.userDocument = null;
            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["emailVerification"]);
            },
            whenSignedInAndEmailVerified: user => {
              this.getUserProfile();
            },
            whenChanged: user => {

            }
          }
        );
      }
    );
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.path=event.url;
      }
    });
  }
  public static getUserDocument(){
    return AppComponent.userDocument;
  }
  getUsername(){
    try {
      return AppComponent.userDocument.publicName;
    } catch (err) {
      return '';
    }
  }
  getUserProfile(){
    return new Promise<number>(
      (resolved, rejected) => {
        this.firestore.listenToDocument(
          {
            name: "Getting Document",
            path: ["Users", this.auth.getAuth().currentUser.uid],
            onUpdate: (result) => {
              AppComponent.userDocument = <UserDocument>result.data();
              this.userHasProfile = result.exists; 
              AppComponent.userDocument.userId = this.auth.getAuth().currentUser.uid;
              if(this.userHasProfile) {
                this.router.navigate(["/postfeed"]);
                resolved(1);
              } else {
                resolved(0);
              }
            }
          }
        );
      }
    );
  }

 
  onLogoutClick(){
    this.auth.signOut();
    this.isSignedIn=false;
  }

  back(){
    this.location.back();
  }

  loggedIn(){
    return this.auth.isSignedIn();
  }

  onLoginClick(){
    this.islogginClick=true;
    this.router.navigate(['login']);
    location.reload();
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
}
