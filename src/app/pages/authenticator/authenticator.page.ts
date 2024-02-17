import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { IonInput } from '@ionic/angular';
@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.page.html',
  styleUrls: ['./authenticator.page.scss'],
})
export class AuthenticatorPage implements OnInit {
  state = AuthenticatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;

  constructor() { 
    this.firebasetsAuth = new FirebaseTSAuth();
    
  }

  ngOnInit() { 
  }

  onResetClick(resetEmail: IonInput){
    let email = resetEmail.value as string;
    if(email!=null && email !='' ) {
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email: email,
          onComplete: (err) => {
            this.state = AuthenticatorCompState.LOGIN;
          } 
        }
      );
    }
  }


  onLogin(
    loginEmail: IonInput,
    loginPassword: IonInput
  ){
    let email = loginEmail.value as string;
    let password = loginPassword.value as string;

    if(this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            this.state = AuthenticatorCompState.LOGIN;
          },
          onFail: (err) => {
            alert(err);
          }
        }
      );
    }

  }

  onRegisterClick(
    registerEmail: IonInput,
    registerPassword: IonInput,
    registerConfirmPassword: IonInput
  ){
    let email = registerEmail.value as string;
    let password = registerPassword.value as string;
    let confirmPassword = registerConfirmPassword.value as string;

    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) && 
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)
    ){
      this.firebasetsAuth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            this.state = AuthenticatorCompState.LOGIN;
          },
          onFail: (err) => {
            alert("Failed to create the account.");
          }
        }
      );
    }

  }

  isNotEmpty(text: string){
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith: string){
    return text == comparedWith;
  }

  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.REGISTER:
        return "Register";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot Password";
    }
  }

}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
