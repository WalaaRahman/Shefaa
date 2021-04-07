import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAndPreviousOrdersComponent } from './user-profile-and-previous-orders.component';

describe('UserProfileAndPreviousOrdersComponent', () => {
  let component: UserProfileAndPreviousOrdersComponent;
  let fixture: ComponentFixture<UserProfileAndPreviousOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileAndPreviousOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileAndPreviousOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
