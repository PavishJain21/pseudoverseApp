import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticatorPage } from './authenticator.page';
import { AutenticatorPageRoutingModule } from './authenticator-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutenticatorPageRoutingModule
  ],
  declarations: [AuthenticatorPage]
})
export class AuthenticatorPageModule {}
