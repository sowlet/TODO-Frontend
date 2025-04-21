import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesTakenComponent } from './classes-taken.component';

describe('ClassesTakenComponent', () => {
  let component: ClassesTakenComponent;
  let fixture: ComponentFixture<ClassesTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesTakenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
