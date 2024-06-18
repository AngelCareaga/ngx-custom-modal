import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxCustomModalComponent } from './ngx-custom-modal.component';
import { CommonModule } from '@angular/common';

describe('NgxCustomModalComponent', () => {
  let component: NgxCustomModalComponent;
  let fixture: ComponentFixture<NgxCustomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NgxCustomModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxCustomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the modal', () => {
    component.open();
    fixture.detectChanges();
    expect(component.visible()).toBeTrue();
    setTimeout(() => {
      expect(component.visibleAnimate()).toBeTrue();
    }, 200);
  });

  it('should close the modal', () => {
    component.open();
    fixture.detectChanges();
    component.close();
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.visible()).toBeFalse();
      expect(component.visibleAnimate()).toBeFalse();
    }, 200);
  });

  it('should handle outside click', () => {
    spyOn(component as any, 'close');
    component.closeOnOutsideClick = true;
    component.options = { closeOnOutsideClick: true };

    component.open();
    fixture.detectChanges();

    const modalElement = fixture.nativeElement.querySelector('.modal');
    if (modalElement) {
      modalElement.click();
      fixture.detectChanges();
      expect(component.close).toHaveBeenCalled();
    }
  });

  it('should handle escape key press', () => {
    spyOn(component as any, 'close');
    component.closeOnEscape = true;
    component.options = { closeOnEscape: true };

    component.open();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
      view: window,
    });

    document.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.close).toHaveBeenCalled();
  });

  it('should add custom class', () => {
    component.customClass = 'custom-class';
    fixture.detectChanges();
    const modalElement = fixture.nativeElement.querySelector('.modal');
    if (modalElement) {
      expect(modalElement.classList.contains('custom-class')).toBeTrue();
    }
  });

  it('should hide close button', () => {
    component.hideCloseButton = true;
    fixture.detectChanges();
    const closeButton = fixture.nativeElement.querySelector('.close');
    expect(closeButton).toBeNull();
  });
});
