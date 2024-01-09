import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxCustomModalComponent } from '../../../ngx-custom-modal/src/public-api';
import { ModalContentComponent } from './modal-content/modal-content.component';

const MODAL_CSS: string[] = [
  'assets/modal.css', // Default.
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxCustomModalComponent, ModalContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'example';

  @ViewChild('componentInsideModal') componentInsideModal: NgxCustomModalComponent | null = null;

  modalCss = 0; // @See toggleCssInjector()

  ngOnInit() {
    this.toggleCssInjector();
  }

  openFromComponent() {
    if (!this.componentInsideModal) return;
    this.componentInsideModal.open();
  }

  // ToggleCssInjector is just for the sake of the demo, switching between custom and Boostrap
  // styles. In your web app you should rather choose one or the other.
  // Web styles reside in ./modal.css
  // Alternatively you can pick Boostrap
  toggleCssInjector() {
    const prev = document.getElementById('injected');
    prev?.parentNode?.removeChild(prev);

    const head = document.head;

    const link = document.createElement('link');
    link.id = 'injected';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = MODAL_CSS[this.modalCss];

    head.appendChild(link);

    this.modalCss = (this.modalCss + 1) % MODAL_CSS.length;
  }
}
