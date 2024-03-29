import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatorPage } from './authenticator.page';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticatorPageRoutingModule {}
