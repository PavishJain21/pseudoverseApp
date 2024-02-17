import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostFeedPage } from './post-feed.page';
import { FeedPage } from './feed/feed.page';
import { CreatePostPage } from 'src/app/create-post/create-post.page';

const routes: Routes = [
  {
    path: '',
    component: PostFeedPage
  },
  {
    path: 'feed',
    component: FeedPage
  },
  {
    path:'createpost',
    component:CreatePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostFeedPageRoutingModule {}
