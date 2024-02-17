import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResendEmailPage } from './resend-email/resend-email.page';
import { AuthenticatorPage } from './pages/authenticator/authenticator.page';

const routes: Routes = [
  {
    path: '',
    component:AppComponent
  },
  {
    path: 'login',
    component:AuthenticatorPage
  },
  {
    path: 'postfeed',
    loadChildren: () => import('./pages/post-feed/post-feed.module').then(m => m.PostFeedPageModule)
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
