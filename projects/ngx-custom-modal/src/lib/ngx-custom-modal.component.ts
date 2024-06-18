import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  signal,
  TemplateRef,
} from '@angular/core';
import { ModalOptions } from './modal-options.interface';

@Component({
  selector: 'ngx-custom-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-custom-modal.component.html',
  styleUrls: ['./ngx-custom-modal.component.scss'],
})
export class NgxCustomModalComponent implements OnDestroy {
  @ContentChild('modalHeader') header: TemplateRef<any> | null = null;
  @ContentChild('modalBody') body: TemplateRef<any> | null = null;
  @ContentChild('modalFooter') footer: TemplateRef<any> | null = null;

  // Controls whether the modal closes when clicking outside of it
  @Input() closeOnOutsideClick = true;

  // Controls whether the modal closes when pressing the escape key
  @Input() closeOnEscape = true;

  // Custom class to be added to the modal
  @Input() customClass?: string;

  // Option to hide the close button
  @Input() hideCloseButton = false;

  // Modal options
  @Input() options: ModalOptions = {};

  visible = signal<boolean>(false);
  public visibleAnimate = signal<boolean>(false);

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnDestroy() {
    // Ensures the modal closes and cleans up resources when the component is destroyed
    this.close();
  }

  /**
   * Opens the modal
   */
  open(): void {
    this.renderer.addClass(document.body, 'modal-open');
    this.visible.set(true);
    setTimeout(() => this.visibleAnimate.set(true));
  }

  /**
   * Closes the modal
   */
  close(): void {
    this.renderer.removeClass(document.body, 'modal-open');
    this.visibleAnimate.set(false);
    setTimeout(() => {
      this.visible.set(false);
      this.changeDetectorRef.markForCheck();
    }, 200);
  }

  /**
   * Event handler for clicking on the modal container.
   * Closes the modal if clicked outside the modal content.
   */
  @HostListener('click', ['$event'])
  onContainerClicked(event: MouseEvent): void {
    const closeOnOutsideClick = this.options.closeOnOutsideClick ?? this.closeOnOutsideClick;
    if ((event.target as HTMLElement).classList.contains('modal') && this.isTopMost() && closeOnOutsideClick) {
      this.close();
    }
  }

  /**
   * Keyboard event handler to close the modal with the Escape key.
   */
  @HostListener('document:keydown', ['$event'])
  onKeyDownHandler(event: KeyboardEvent): void {
    const closeOnEscape = this.options.closeOnEscape ?? this.closeOnEscape;
    if (event.key === 'Escape' && this.isTopMost() && closeOnEscape) {
      this.close();
    }
  }

  /**
   * Determines if this modal is the topmost in the stack of modals.
   *
   * @returns {boolean} True if the modal is the topmost.
   */
  isTopMost(): boolean {
    return !this.elementRef.nativeElement.querySelector(':scope app-modal > .modal');
  }

  /**
   * Gets the custom class to be added to the modal.
   *
   * @returns {string} The custom class.
   */
  getCustomClass(): string {
    return this.customClass ?? this.options.customClass ?? '';
  }

  /**
   * Determines if the close button should be hidden.
   *
   * @returns {boolean} True if the close button should be hidden.
   */
  shouldHideCloseButton(): boolean {
    return this.hideCloseButton || this.options.hideCloseButton || false;
  }
}
