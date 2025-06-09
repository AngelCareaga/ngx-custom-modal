import { Injectable, signal } from '@angular/core';
import { NgxCustomModalComponent } from './ngx-custom-modal.component';

/**
 * Service for managing multiple modal instances and their stacking order.
 *
 * Handles:
 * - Z-index calculation for proper stacking
 * - Modal registration/unregistration
 * - Top-most modal identification
 * - Body class management
 *
 * @injectable
 * @public
 */
@Injectable({ providedIn: 'root' })
export class NgxModalStackService {
  private modals = signal<NgxCustomModalComponent[]>([]);
  private baseZIndex = 1050;

  /**
   * Registers a modal instance with the stack service.
   * @param modal - The modal component to register
   * @public
   */
  register(modal: NgxCustomModalComponent): void {
    this.modals.update(modals => [...modals, modal]);
  }

  /**
   * Unregisters a modal instance from the stack service.
   * @param modal - The modal component to unregister
   * @public
   */
  unregister(modal: NgxCustomModalComponent): void {
    this.modals.update(modals => modals.filter(m => m !== modal));
  }

  /**
   * Determines if the given modal is the topmost visible modal.
   * Used for proper event handling and accessibility.
   * @param modal - The modal instance to check
   * @returns {boolean} True if the modal is topmost
   * @public
   */
  isTopMost(modal: NgxCustomModalComponent): boolean {
    const modals = this.modals();
    const visibleModals = modals.filter(m => m.visible());
    return visibleModals[visibleModals.length - 1] === modal;
  }

  /**
   * Calculates the next z-index value for a new modal.
   * Each modal gets a z-index 10 units higher than the previous.
   * @returns {number} The z-index value to use
   * @public
   */
  getNextZIndex(): number {
    const visibleCount = this.modals().filter(m => m.visible()).length;
    return this.baseZIndex + visibleCount * 10;
  }

  /**
   * Gets the count of currently active (visible) modals.
   * @returns {number} Number of active modals
   * @public
   */
  getActiveModalsCount(): number {
    return this.modals().filter(m => m.visible()).length;
  }
}
