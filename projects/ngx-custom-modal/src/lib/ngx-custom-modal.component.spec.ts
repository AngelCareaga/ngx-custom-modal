import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ModalStackService, NgxCustomModalComponent } from './ngx-custom-modal.component';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <ngx-custom-modal #testModal [options]="modalOptions" (opened)="onOpened()" (closed)="onClosed()">
      <ng-template #modalHeader>
        <h2>Test Modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <p>Test modal content</p>
        <button id="test-button">Test Button</button>
      </ng-template>
      <ng-template #modalFooter>
        <button type="button" (click)="testModal.close()">Close</button>
      </ng-template>
    </ngx-custom-modal>
  `,
})
class TestHostComponent {
  @ViewChild('testModal') modal!: NgxCustomModalComponent;
  modalOptions = {};
  openedCalled = false;
  closedCalled = false;

  onOpened() {
    this.openedCalled = true;
  }

  onClosed() {
    this.closedCalled = true;
  }
}

describe('NgxCustomModalComponent', () => {
  let component: NgxCustomModalComponent;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let modalStackService: ModalStackService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NgxCustomModalComponent],
      declarations: [TestHostComponent],
      providers: [ModalStackService],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.modal;
    modalStackService = TestBed.inject(ModalStackService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(hostComponent).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.visible()).toBeFalse();
    expect(component.closeOnOutsideClick).toBeTrue();
    expect(component.closeOnEscape).toBeTrue();
    expect(component.hideCloseButton).toBeFalse();
    expect(component.size).toBe('md');
    expect(component.centered).toBeFalse();
    expect(component.scrollable).toBeFalse();
    expect(component.animation).toBeTrue();
  });

  it('should open the modal', fakeAsync(() => {
    component.open();
    tick(10);
    fixture.detectChanges();

    expect(component.visible()).toBeTrue();
    expect(hostComponent.openedCalled).toBeTrue();

    tick(200);
    expect(component.visibleAnimate()).toBeTrue();
  }));

  it('should close the modal', fakeAsync(() => {
    component.open();
    tick(10);
    fixture.detectChanges();

    component.close();
    tick(200);
    fixture.detectChanges();

    expect(component.visible()).toBeFalse();
    expect(hostComponent.closedCalled).toBeTrue();
    expect(component.visibleAnimate()).toBeFalse();
  }));

  it('should toggle modal visibility', fakeAsync(() => {
    expect(component.visible()).toBeFalse();

    component.toggle();
    tick(10);
    fixture.detectChanges();
    expect(component.visible()).toBeTrue();

    component.toggle();
    tick(200);
    fixture.detectChanges();
    expect(component.visible()).toBeFalse();
  }));

  it('should handle outside click when enabled', fakeAsync(() => {
    component.closeOnOutsideClick = true;
    component.open();
    tick(10);
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeTruthy();

    spyOn(component, 'close');
    modalElement.nativeElement.click();

    expect(component.close).toHaveBeenCalled();
  }));

  it('should not close on outside click when disabled', fakeAsync(() => {
    component.closeOnOutsideClick = false;
    component.open();
    tick(10);
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal'));
    spyOn(component, 'close');
    modalElement.nativeElement.click();

    expect(component.close).not.toHaveBeenCalled();
  }));

  it('should handle escape key press when enabled', fakeAsync(() => {
    component.closeOnEscape = true;
    component.open();
    tick(10);
    fixture.detectChanges();

    spyOn(component, 'close');

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);
    expect(component.close).toHaveBeenCalled();
  }));

  it('should not close on escape when disabled', fakeAsync(() => {
    component.closeOnEscape = false;
    component.open();
    tick(10);
    fixture.detectChanges();

    spyOn(component, 'close');

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);
    expect(component.close).not.toHaveBeenCalled();
  }));

  it('should add custom class', fakeAsync(() => {
    component.customClass = 'custom-test-class';
    component.open();
    tick(10);
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement.nativeElement.classList.contains('custom-test-class')).toBeTrue();
  }));

  it('should hide close button when configured', fakeAsync(() => {
    component.hideCloseButton = true;
    component.open();
    tick(10);
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.close'));
    expect(closeButton).toBeFalsy();
  }));

  it('should show close button by default', fakeAsync(() => {
    component.hideCloseButton = false;
    component.open();
    tick(10);
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.close'));
    expect(closeButton).toBeTruthy();
  }));

  it('should apply size classes correctly', () => {
    component.size = 'lg';
    expect(component.getDialogClasses()).toContain('modal-lg');

    component.size = 'sm';
    expect(component.getDialogClasses()).toContain('modal-sm');

    component.size = 'xl';
    expect(component.getDialogClasses()).toContain('modal-xl');
  });

  it('should apply centered class when configured', () => {
    component.centered = true;
    expect(component.getDialogClasses()).toContain('modal-dialog-centered');
  });

  it('should apply scrollable class when configured', () => {
    component.scrollable = true;
    expect(component.getDialogClasses()).toContain('modal-dialog-scrollable');
  });

  it('should handle tab key navigation', fakeAsync(() => {
    component.open();
    tick(10);
    fixture.detectChanges();

    const testButton = fixture.debugElement.query(By.css('#test-button'));
    const closeButton = fixture.debugElement.query(By.css('.close'));

    expect(testButton).toBeTruthy();
    expect(closeButton).toBeTruthy();

    testButton.nativeElement.focus();
    expect(document.activeElement).toBe(testButton.nativeElement);

    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });

    spyOn(tabEvent, 'preventDefault');
    document.dispatchEvent(tabEvent);
  }));

  it('should manage modal stack correctly', () => {
    spyOn(modalStackService, 'register');
    spyOn(modalStackService, 'unregister');

    const newComponent = new NgxCustomModalComponent();
    newComponent.ngOnInit();

    expect(modalStackService.register).toHaveBeenCalledWith(newComponent);

    newComponent.ngOnDestroy();
    expect(modalStackService.unregister).toHaveBeenCalledWith(newComponent);
  });

  it('should check if modal is topmost', () => {
    spyOn(modalStackService, 'isTopMost').and.returnValue(true);
    expect(component.isTopMost()).toBeTrue();

    modalStackService.isTopMost = jasmine.createSpy().and.returnValue(false);
    expect(component.isTopMost()).toBeFalse();
  });

  it('should handle options object configuration', fakeAsync(() => {
    hostComponent.modalOptions = {
      closeOnOutsideClick: false,
      closeOnEscape: false,
      customClass: 'options-class',
      hideCloseButton: true,
      size: 'lg',
      centered: true,
      animation: false,
    };

    component.options = hostComponent.modalOptions;
    fixture.detectChanges();

    expect(component.shouldHideCloseButton()).toBeTrue();
    expect(component.getCustomClass()).toContain('options-class');
    expect(component.getDialogClasses()).toContain('modal-lg');
    expect(component.getDialogClasses()).toContain('modal-dialog-centered');
  }));

  it('should emit events correctly', fakeAsync(() => {
    spyOn(component.opening, 'emit');
    spyOn(component.opened, 'emit');
    spyOn(component.closing, 'emit');
    spyOn(component.closed, 'emit');

    component.open();
    expect(component.opening.emit).toHaveBeenCalled();

    tick(10);
    expect(component.opened.emit).toHaveBeenCalled();

    component.close();
    expect(component.closing.emit).toHaveBeenCalled();

    tick(200);
    expect(component.closed.emit).toHaveBeenCalled();
  }));

  it('should handle accessibility attributes correctly', fakeAsync(() => {
    component.open();
    tick(10);
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement.nativeElement.getAttribute('aria-modal')).toBe('true');
    expect(modalElement.nativeElement.getAttribute('role')).toBe('dialog');
    expect(modalElement.nativeElement.hasAttribute('aria-labelledby')).toBeTrue();
    expect(modalElement.nativeElement.hasAttribute('aria-describedby')).toBeTrue();
  }));
});

describe('ModalStackService', () => {
  let service: ModalStackService;
  let modal1: NgxCustomModalComponent;
  let modal2: NgxCustomModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalStackService],
    });

    service = TestBed.inject(ModalStackService);
    modal1 = new NgxCustomModalComponent();
    modal2 = new NgxCustomModalComponent();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register and unregister modals', () => {
    expect(service.getActiveModalsCount()).toBe(0);

    service.register(modal1);
    service.register(modal2);

    service.unregister(modal1);
    service.unregister(modal2);
  });

  it('should calculate z-index correctly', () => {
    const baseZIndex = 1050;
    expect(service.getNextZIndex()).toBe(baseZIndex);

    service.register(modal1);
    expect(service.getNextZIndex()).toBe(baseZIndex + 10);

    service.register(modal2);
    expect(service.getNextZIndex()).toBe(baseZIndex + 20);
  });

  it('should identify topmost modal correctly', () => {
    service.register(modal1);
    service.register(modal2);

    expect(service.isTopMost(modal2)).toBeTrue();
    expect(service.isTopMost(modal1)).toBeFalse();
  });
});
