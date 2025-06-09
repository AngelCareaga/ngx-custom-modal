// ./projects/ngx-custom-modal/src/public-api.ts

/**
 * @fileoverview Public API for ngx-custom-modal library
 *
 * This file defines what is exported from the library and available
 * for consumers to import. All exports are carefully curated to provide
 * a clean and stable API surface.
 *
 * @version 20.0.0
 * @author Angel Careaga <dev.angelcareaga@gmail.com>
 */

/**
 * Core modal component and stack management service.
 * These are the primary exports that most users will need.
 */
export { NgxCustomModalComponent } from './lib/ngx-custom-modal.component';
export { NgxModalStackService } from './lib/ngx-modal-stack.service';

/**
 * Type definitions for configuration and customization.
 * These interfaces provide strong typing for modal options and state.
 */
export { ModalOptions, ModalButton, ModalState } from './lib/modal-options.interface';
