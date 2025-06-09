// ./projects/ngx-custom-modal/src/lib/ngx-custom-modal.component.ts

import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  afterEveryRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  effect,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalOptions, ModalState } from './modal-options.interface';
import { NgxModalStackService } from './ngx-modal-stack.service';

/**
 * A feature-rich, accessible modal component for Angular 17+ applications.
 *
 * Features:
 * - Signal-based reactivity for optimal performance
 * - Advanced modal stacking with z-index management
 * - Full WCAG accessibility compliance
 * - Bootstrap 3, 4 & 5 compatibility
 * - Touch-optimized for mobile devices
 * - Customizable animations and styling
 *
 * @example
 * ```html
 * <ngx-custom-modal #modal [size]="'lg'" [centered]="true">
 *   <ng-template #modalHeader>
 *     <h2>Modal Title</h2>
 *   </ng-template>
 *   <ng-template #modalBody>
 *     <p>Modal content</p>
 *   </ng-template>
 * </ngx-custom-modal>
 * ```
 *
 * @public
 */
@Component({
  selector: 'ngx-custom-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-custom-modal.component.html',
  styleUrls: ['./ngx-custom-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCustomModalComponent implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private document = inject(Document, { optional: true });

  @ViewChild('modalDialog', { static: false }) modalDialog!: ElementRef<HTMLDialogElement>;

  /** Template reference for modal header content */
  @ContentChild('modalHeader') header: TemplateRef<any> | null = null;

  /** Template reference for modal body content */
  @ContentChild('modalBody') body: TemplateRef<any> | null = null;

  /** Template reference for modal footer content */
  @ContentChild('modalFooter') footer: TemplateRef<any> | null = null;

  /** Close modal when clicking outside the modal content. @default true */
  @Input() closeOnOutsideClick = true;

  /** Close modal when pressing the Escape key. @default true */
  @Input() closeOnEscape = true;

  /** Additional CSS class to apply to the modal container */
  @Input() customClass?: string;

  /** Hide the default close button (×) in the header. @default false */
  @Input() hideCloseButton = false;

  /** Configuration options object that overrides individual properties */
  @Input() options: ModalOptions = {};

  /** Modal size preset. @default 'md' */
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Center modal vertically in viewport. @default false */
  @Input() centered = false;

  /** Make modal body scrollable when content overflows. @default false */
  @Input() scrollable = false;

  /** Enable CSS transition animations. @default true */
  @Input() animation = true;

  /** Backdrop behavior configuration. @default 'dynamic' */
  @Input() backdrop: 'static' | 'dynamic' = 'dynamic';

  /** Enable keyboard interactions. @default true */
  @Input() keyboard = true;

  /** Enable automatic focus management. @default true */
  @Input() focus = true;

  /** Emitted when modal starts opening */
  @Output() opened = new EventEmitter<void>();

  /** Emitted when modal is fully closed */
  @Output() closed = new EventEmitter<void>();

  /** Emitted before modal starts opening */
  @Output() opening = new EventEmitter<void>();

  /** Emitted before modal starts closing */
  @Output() closing = new EventEmitter<void>();

  private modalState = signal<ModalState>({
    isVisible: false,
    isAnimating: false,
    zIndex: 1050,
    previousFocusedElement: undefined,
  });

  private animationDuration = signal<number>(200);
  private modalStack = signal<NgxCustomModalComponent[]>([]);

  /** Computed signal for modal visibility state */
  visible = computed(() => this.modalState().isVisible);

  /** Signal for animation state */
  visibleAnimate = signal<boolean>(false);

  /** Computed signal for animation state */
  isAnimating = computed(() => this.modalState().isAnimating);

  /** Unique ID for modal title (ARIA) */
  titleId = signal(`modal-title-${Math.random().toString(36).substr(2, 9)}`);

  /** Unique ID for modal description (ARIA) */
  descriptionId = signal(`modal-desc-${Math.random().toString(36).substr(2, 9)}`);

  private previouslyFocusedElement: HTMLElement | null = null;
  private modalStackService = inject(NgxModalStackService, { optional: true });

  constructor() {
    // Effect to handle modal visibility changes
    effect(() => {
      const isVisible = this.visible();
      if (isVisible) {
        this.handleModalOpen();
      } else {
        this.handleModalClose();
      }
    });

    // Effect to handle animation duration changes
    effect(() => {
      const duration = this.options.animationDuration || 200;
      this.animationDuration.set(duration);
      this.updateCSSAnimationDuration(duration);
    });

    // Setup after render hooks
    afterNextRender(() => {
      this.setupAccessibility();
      this.setupKeyboardNavigation();
      this.setupFocusManagement();
    });

    afterEveryRender(() => {
      if (this.visible() && this.modalDialog) {
        this.adjustModalPosition();
        this.ensureProperZIndex();
      }
    });
  }

  ngOnInit(): void {
    this.registerInModalStack();
  }

  ngOnDestroy(): void {
    this.close();
    this.unregisterFromModalStack();
    this.restoreFocus();
    this.removeBodyClass();
  }

  /**
   * Opens the modal with proper accessibility and focus management.
   *
   * Automatically handles:
   * - Focus management (saves current focus, sets focus to modal)
   * - Body scroll locking
   * - Z-index management for stacking
   * - Screen reader announcements
   *
   * @public
   * @fires opening - Before modal animation starts
   * @fires opened - After modal is fully visible
   */
  open(): void {
    if (this.visible()) return;

    this.opening.emit();
    this.storePreviousFocus();
    this.addBodyClass();

    this.modalState.update(state => ({
      ...state,
      isVisible: true,
      isAnimating: true,
    }));

    if (this.animation) {
      setTimeout(() => {
        this.visibleAnimate.set(true);
        this.modalState.update(state => ({ ...state, isAnimating: false }));
        this.focusFirstElement();
        this.opened.emit();
      }, 10);
    } else {
      this.visibleAnimate.set(true);
      this.modalState.update(state => ({ ...state, isAnimating: false }));
      this.focusFirstElement();
      this.opened.emit();
    }
  }

  /**
   * Closes the modal and restores previous state.
   *
   * Automatically handles:
   * - Focus restoration to previously focused element
   * - Body scroll unlock (if no other modals open)
   * - Cleanup of event listeners
   *
   * @public
   * @fires closing - Before modal animation starts
   * @fires closed - After modal is fully hidden
   */
  close(): void {
    if (!this.visible()) return;

    this.closing.emit();

    this.modalState.update(state => ({
      ...state,
      isAnimating: true,
    }));

    this.visibleAnimate.set(false);

    const duration = this.animation ? this.animationDuration() : 0;

    setTimeout(() => {
      this.modalState.update(state => ({
        ...state,
        isVisible: false,
        isAnimating: false,
      }));

      this.removeBodyClass();
      this.restoreFocus();
      this.closed.emit();
    }, duration);
  }

  /**
   * Toggles the modal visibility state.
   * @public
   */
  toggle(): void {
    if (this.visible()) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Handles clicks on the modal container for outside click detection.
   * @param event - The mouse click event
   * @private
   */
  @HostListener('click', ['$event'])
  onContainerClicked(event: MouseEvent): void {
    const closeOnOutsideClick = this.options.closeOnOutsideClick ?? this.closeOnOutsideClick;
    const backdrop = this.options.backdrop || this.backdrop;

    if (
      (event.target as HTMLElement).classList.contains('modal') &&
      this.isTopMost() &&
      closeOnOutsideClick &&
      backdrop === 'dynamic'
    ) {
      this.close();
    }
  }

  /**
   * Handles global keyboard events for modal functionality.
   * @param event - The keyboard event
   * @private
   */
  @HostListener('document:keydown', ['$event'])
  onKeyDownHandler(event: KeyboardEvent): void {
    if (!this.visible() || !this.isTopMost()) return;

    const closeOnEscape = this.options.closeOnEscape ?? this.closeOnEscape;
    const keyboardEnabled = this.options.keyboard ?? this.keyboard;

    if (event.key === 'Escape' && closeOnEscape && keyboardEnabled) {
      this.close();
    } else if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
  }

  /**
   * Checks if this modal is the topmost in the stack.
   * Used for proper event handling in nested modals.
   *
   * @returns {boolean} True if this modal is on top of the stack
   * @public
   */
  isTopMost(): boolean {
    if (this.modalStackService) {
      return this.modalStackService.isTopMost(this);
    }
    return !this.elementRef.nativeElement.querySelector(':scope ngx-custom-modal > .modal');
  }

  /**
   * Gets the combined custom CSS classes for the modal.
   * @returns {string} Space-separated CSS classes
   * @public
   */
  getCustomClass(): string {
    const customClass = this.customClass ?? this.options.customClass ?? '';
    const sizeClass = this.getSizeClass();
    const animationClass = this.getAnimationClass();

    return [customClass, sizeClass, animationClass].filter(Boolean).join(' ');
  }

  /**
   * Gets the CSS classes for the modal dialog container.
   * @returns {string} Space-separated CSS classes
   * @public
   */
  getDialogClasses(): string {
    const classes: string[] = [];

    if (this.centered || this.options.centered) {
      classes.push('modal-dialog-centered');
    }

    if (this.scrollable || this.options.scrollable) {
      classes.push('modal-dialog-scrollable');
    }

    const size = this.options.size || this.size;
    if (size && size !== 'md') {
      classes.push(`modal-${size}`);
    }

    return classes.join(' ');
  }

  /**
   * Determines if the close button should be hidden.
   * @returns {boolean} True if close button should be hidden
   * @public
   */
  shouldHideCloseButton(): boolean {
    return this.hideCloseButton || this.options.hideCloseButton || false;
  }

  /**
   * Gets the ARIA label for the close button.
   * @returns {string} Localized close button label
   * @public
   */
  getCloseButtonLabel(): string {
    return 'Close modal';
  }

  /**
   * Checks if header content is available.
   * @returns {boolean} True if header template exists
   * @public
   */
  hasHeaderContent(): boolean {
    return !!this.header;
  }

  /**
   * Checks if footer content is available.
   * @returns {boolean} True if footer template exists
   * @public
   */
  hasFooterContent(): boolean {
    return !!this.footer;
  }

  /**
   * Handles modal opening side effects.
   * @private
   */
  private handleModalOpen(): void {
    this.previouslyFocusedElement = this.document?.activeElement as HTMLElement;
    this.announceToScreenReader('Modal opened');
  }

  /**
   * Handles modal closing side effects.
   * @private
   */
  private handleModalClose(): void {
    this.announceToScreenReader('Modal closed');
  }

  /**
   * Sets up accessibility attributes and ARIA labels.
   * @private
   */
  private setupAccessibility(): void {
    const modalElement = this.elementRef.nativeElement.querySelector('.modal');
    if (modalElement) {
      modalElement.setAttribute('role', 'dialog');
      modalElement.setAttribute('aria-modal', 'true');
    }
  }

  /**
   * Sets up keyboard navigation handlers.
   * @private
   */
  private setupKeyboardNavigation(): void {
    // Keyboard navigation is handled in the @HostListener
  }

  /**
   * Sets up focus management systems.
   * @private
   */
  private setupFocusManagement(): void {
    // Focus management is handled in focusFirstElement and restoreFocus methods
  }

  /**
   * Adjusts modal position and size based on viewport.
   * @private
   */
  private adjustModalPosition(): void {
    const modalDialog = this.elementRef.nativeElement.querySelector('.modal-dialog');
    if (modalDialog) {
      const rect = modalDialog.getBoundingClientRect();
      if (rect.height > window.innerHeight * 0.9) {
        modalDialog.style.height = `${window.innerHeight * 0.9}px`;
      }
    }
  }

  /**
   * Ensures proper z-index for modal stacking.
   * @private
   */
  private ensureProperZIndex(): void {
    const modalElement = this.elementRef.nativeElement.querySelector('.modal') as HTMLElement;
    if (modalElement && this.modalStackService) {
      const zIndex = this.modalStackService.getNextZIndex();
      modalElement.style.zIndex = zIndex.toString();

      this.modalState.update(state => ({
        ...state,
        zIndex,
      }));
    }
  }

  /**
   * Stores the currently focused element for later restoration.
   * @private
   */
  private storePreviousFocus(): void {
    this.previouslyFocusedElement = this.document?.activeElement as HTMLElement;

    this.modalState.update(state => ({
      ...state,
      previousFocusedElement: this.previouslyFocusedElement || undefined,
    }));
  }

  /**
   * Restores focus to the previously focused element.
   * @private
   */
  private restoreFocus(): void {
    if (this.previouslyFocusedElement && this.focus) {
      setTimeout(() => {
        this.previouslyFocusedElement?.focus();
      }, 0);
    }
  }

  /**
   * Manages focus within the modal for accessibility.
   * Focuses first focusable element or close button as fallback.
   * @private
   */
  private focusFirstElement(): void {
    if (!this.focus) return;

    setTimeout(() => {
      const modalElement = this.elementRef.nativeElement.querySelector('.modal');
      const firstFocusable = modalElement?.querySelector(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;

      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        const closeButton = modalElement?.querySelector('.close') as HTMLElement;
        closeButton?.focus();
      }
    }, 0);
  }

  /**
   * Handles tab key navigation to trap focus within the modal.
   * Implements circular focus trapping as per WCAG guidelines.
   * @param event - The keyboard event
   * @private
   */
  private handleTabKey(event: KeyboardEvent): void {
    const modalElement = this.elementRef.nativeElement.querySelector('.modal');
    if (!modalElement) return;

    const focusableElements = Array.from(
      modalElement.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (this.document?.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (this.document?.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }

  /**
   * Adds modal-open class to body to prevent scrolling.
   * @private
   */
  private addBodyClass(): void {
    this.document?.body.classList.add('modal-open');
  }

  /**
   * Removes modal-open class from body when no modals are open.
   * @private
   */
  private removeBodyClass(): void {
    if (this.modalStackService?.getActiveModalsCount() === 0) {
      this.document?.body.classList.remove('modal-open');
    }
  }

  /**
   * Gets the CSS class for modal size.
   * @returns {string} Size-specific CSS class
   * @private
   */
  private getSizeClass(): string {
    const size = this.options.size || this.size;
    return size && size !== 'md' ? `modal-${size}` : '';
  }

  /**
   * Gets the CSS class for animation state.
   * @returns {string} Animation-specific CSS class
   * @private
   */
  private getAnimationClass(): string {
    const hasAnimation = this.options.animation ?? this.animation;
    return hasAnimation ? 'modal-animated' : 'modal-no-animation';
  }

  /**
   * Updates CSS custom property for animation duration.
   * @param duration - Animation duration in milliseconds
   * @private
   */
  private updateCSSAnimationDuration(duration: number): void {
    const modalElement = this.elementRef.nativeElement.querySelector('.modal') as HTMLElement;
    if (modalElement) {
      modalElement.style.setProperty('--modal-animation-duration', `${duration}ms`);
    }
  }

  /**
   * Registers this modal instance with the modal stack service.
   * @private
   */
  private registerInModalStack(): void {
    this.modalStackService?.register(this);
  }

  /**
   * Unregisters this modal instance from the modal stack service.
   * @private
   */
  private unregisterFromModalStack(): void {
    this.modalStackService?.unregister(this);
  }

  /**
   * Announces messages to screen readers for accessibility.
   * @param message - Message to announce
   * @private
   */
  private announceToScreenReader(message: string): void {
    const announcement = this.document?.createElement('div');
    if (!announcement) return;

    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only visually-hidden';
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    this.document?.body.appendChild(announcement);

    setTimeout(() => {
      this.document?.body.removeChild(announcement);
    }, 1000);
  }
}
