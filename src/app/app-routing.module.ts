import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResendEmailPage } from './resend-email/resend-email.page';
import { AuthenticatorPage } from './pages/authenticator/authenticator.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'postfeed'
  },
  {
    path: 'postfeed',
    loadChildren: () => import('./pages/post-feed/post-feed.module').then(m => m.PostFeedPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/authenticator/authenticator.module').then(m => m.AuthenticatorPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'emailVerification',
    component:ResendEmailPage
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
