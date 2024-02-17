import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResendEmailPage } from './resend-email.page';

describe('ResendEmailPage', () => {
  let component: ResendEmailPage;
  let fixture: ComponentFixture<ResendEmailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResendEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
