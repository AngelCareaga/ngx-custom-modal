import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCustomModalComponent } from './ngx-custom-modal.component';

describe('NgxCustomModalComponent', () => {
  let component: NgxCustomModalComponent;
  let fixture: ComponentFixture<NgxCustomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCustomModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxCustomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
