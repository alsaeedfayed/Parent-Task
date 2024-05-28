import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserRowComponent } from './dashboard-user-row.component';

describe('DashboardUserRowComponent', () => {
  let component: DashboardUserRowComponent;
  let fixture: ComponentFixture<DashboardUserRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardUserRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardUserRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
