import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyScheduleViewComponent } from './weekly-schedule-view.component';

describe('WeeklyScheduleViewComponent', () => {
  let component: WeeklyScheduleViewComponent;
  let fixture: ComponentFixture<WeeklyScheduleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyScheduleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
