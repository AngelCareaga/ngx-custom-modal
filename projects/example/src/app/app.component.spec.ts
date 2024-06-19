import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxCustomModalComponent } from '../../../ngx-custom-modal/src/public-api';
import { ModalContentComponent } from './modal-content/modal-content.component';

const MODAL_CSS: string[] = [
  'assets/modal.css',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
];

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, NgxCustomModalComponent, ModalContentComponent, AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'example' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('example');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('<angular-custom-modal>');
  });

  it('should toggle CSS injector', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const toggleCssInjectorSpy = spyOn(app as any, 'toggleCssInjector').and.callThrough();
    app.toggleCssInjector();
    expect(toggleCssInjectorSpy).toHaveBeenCalled();
    const linkElement = document.getElementById('injected') as HTMLLinkElement;
    expect(linkElement.href).toContain(MODAL_CSS[0]);
  });

  it('should open the component inside modal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.openFromComponent();
    expect(app.componentInsideModal?.visible()).toBeTrue();
  });
});
