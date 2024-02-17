import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostFeedPage } from './post-feed.page';

describe('PostFeedPage', () => {
  let component: PostFeedPage;
  let fixture: ComponentFixture<PostFeedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
