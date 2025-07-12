// ./projects/ngx-custom-modal/src/lib/modal-options.interface.ts

/**
 * Configuration options for the ngx-custom-modal component.
 * @public
 */
export interface ModalOptions {
  /** Close modal when clicking outside the modal content. @default true */
  closeOnOutsideClick?: boolean;

  /** Close modal when pressing the Escape key. @default true */
  closeOnEscape?: boolean;

  /** Additional CSS class to apply to the modal container */
  customClass?: string;

  /** Hide the default close button (×) in the header. @default false */
  hideCloseButton?: boolean;

  /**
   * Backdrop behavior configuration
   * - 'static': Prevents closing when clicking outside
   * - 'dynamic': Allows closing when clicking outside (if closeOnOutsideClick is true)
   * @default 'dynamic'
   */
  backdrop?: 'static' | 'dynamic';

  /** Enable keyboard interactions (Tab navigation, Escape key). @default true */
  keyboard?: boolean;

  /** Enable automatic focus management. @default true */
  focus?: boolean;

  /**
   * Modal size preset
   * - 'sm': Small (300px max-width)
   * - 'md': Medium (500px max-width)
   * - 'lg': Large (800px max-width)
   * - 'xl': Extra Large (1140px max-width)
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Center modal vertically in viewport. @default false */
  centered?: boolean;

  /** Make modal body scrollable when content overflows. @default false */
  scrollable?: boolean;

  /** Enable CSS transition animations. @default true */
  animation?: boolean;

  /** Animation duration in milliseconds. @default 200 */
  animationDuration?: number;

  /** Close modal automatically when navigating to a different route. @default true */
  closeOnRouteChange?: boolean;
}

/**
 * Button configuration for modal footers.
 * @public
 */
export interface ModalButton {
  /** Unique identifier for the button */
  id: string;

  /** Display text for the button */
  text: string;

  /** CSS classes to apply to the button */
  class: string;

  /** HTML button type attribute. @default 'button' */
  type?: 'button' | 'submit' | 'reset';

  /** Click event handler function */
  handler?: () => void;

  /** Disable the button. @default false */
  disabled?: boolean;
}

/**
 * Internal state interface for modal component.
 * Used by signals for reactive state management.
 * @internal
 */
export interface ModalState {
  /** Whether the modal is currently visible */
  isVisible: boolean;

  /** Whether the modal is currently animating (opening/closing) */
  isAnimating: boolean;

  /** Current z-index value for stacking */
  zIndex: number;

  /** Element that had focus before modal opened (for restoration) */
  previousFocusedElement?: HTMLElement;
}
