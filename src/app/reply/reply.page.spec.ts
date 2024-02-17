import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplyPage } from './reply.page';

describe('ReplyPage', () => {
  let component: ReplyPage;
  let fixture: ComponentFixture<ReplyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
