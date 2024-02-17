import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReplyPageRoutingModule } from './reply-routing.module';

import { ReplyPage } from './reply.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReplyPageRoutingModule
  ],
  declarations: [ReplyPage]
})
export class ReplyPageModule {}
