import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostFeedPageRoutingModule } from './post-feed-routing.module';

import { PostFeedPage } from './post-feed.page';
import { PostPage } from './post/post.page';
import { FeedPage } from './feed/feed.page';
import { CreatePostPage } from 'src/app/create-post/create-post.page';
import { ReplyPage } from 'src/app/reply/reply.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostFeedPageRoutingModule
  ],
  declarations: [PostFeedPage, PostPage,FeedPage,CreatePostPage,ReplyPage],
  exports: [PostPage,FeedPage,CreatePostPage,ReplyPage]
})
export class PostFeedPageModule {}
