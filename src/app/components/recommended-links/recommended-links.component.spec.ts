import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedLinksComponent } from './recommended-links.component';

describe('RecommendedLinksComponent', () => {
  let component: RecommendedLinksComponent;
  let fixture: ComponentFixture<RecommendedLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
