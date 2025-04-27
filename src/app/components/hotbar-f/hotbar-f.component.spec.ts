import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotbarFComponent } from './hotbar-f.component';

describe('HotbarFComponent', () => {
  let component: HotbarFComponent;
  let fixture: ComponentFixture<HotbarFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotbarFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotbarFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});