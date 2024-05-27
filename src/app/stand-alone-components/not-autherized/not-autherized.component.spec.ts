import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAutherizedComponent } from './not-autherized.component';

describe('NotAutherizedComponent', () => {
  let component: NotAutherizedComponent;
  let fixture: ComponentFixture<NotAutherizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAutherizedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAutherizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
