import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  signal,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ngx-custom-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-custom-modal.component.html',
  styleUrls: ['./ngx-custom-modal.component.scss'],
})
export class NgxCustomModalComponent {
  // References to parts of the modal for content injection
  @ContentChild('modalHeader') header: TemplateRef<any> | null = null;
  @ContentChild('modalBody') body: TemplateRef<any> | null = null;
  @ContentChild('modalFooter') footer: TemplateRef<any> | null = null;

  // Controls whether the modal closes when clicking outside of it
  @Input() closeOnOutsideClick = true;

  // Controls the visibility and animation of the modal
  visible = signal<boolean>(false);
  public visibleAnimate = signal<boolean>(false);

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

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
    if ((event.target as HTMLElement).classList.contains('modal') && this.isTopMost() && this.closeOnOutsideClick) {
      this.close();
    }
  }

  /**
   * Keyboard event handler to close the modal with the Escape key.
   */
  @HostListener('document:keydown', ['$event'])
  onKeyDownHandler(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isTopMost()) {
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
}
