import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationHeaderComponent } from './registeration-header.component';

describe('RegisterationHeaderComponent', () => {
  let component: RegisterationHeaderComponent;
  let fixture: ComponentFixture<RegisterationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterationHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
