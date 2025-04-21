import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCtComponent } from './profile-ct.component';

describe('ProfileCtComponent', () => {
  let component: ProfileCtComponent;
  let fixture: ComponentFixture<ProfileCtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
