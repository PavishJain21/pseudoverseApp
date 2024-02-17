import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.page.html',
  styleUrls: ['./resend-email.page.scss'],
})
export class ResendEmailPage implements OnInit {

  auth = new FirebaseTSAuth();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(
      this.auth.isSignedIn() &&
      !this.auth.getAuth().currentUser.emailVerified
    ) {
      this.auth.sendVerificationEmail();
    } else {
      this.router.navigate([""]);
    }
  }

  onResendClick(){
    this.auth.sendVerificationEmail();
  }

  navigateToHome(){
    this.router.navigate([""]);
  }
}
