// projects/example/src/app/components/examples/modal-examples/modal-examples.component.ts
import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { StyleMode } from '../../../services/style-toggle.service';
import { NgxCustomModalComponent } from 'ngx-custom-modal';

@Component({
  selector: 'app-modal-examples',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxCustomModalComponent, ModalContentComponent],
  template: `
    <!-- Component Inside Modal -->
    <ngx-custom-modal #componentInsideModal [closeOnEscape]="false" [closeOnOutsideClick]="false">
      <ng-template #modalHeader>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Component inside modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <app-modal-content></app-modal-content>
      </ng-template>
      <ng-template #modalFooter>
        <button
          (click)="componentInsideModal.close()"
          class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </ng-template>
    </ngx-custom-modal>

    <!-- HTML Inside Modal -->
    <ngx-custom-modal #htmlInsideModal>
      <ng-template #modalHeader>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">HTML inside modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <div class="space-y-6">
          <div>
            <p class="text-gray-700 dark:text-gray-300">I'm HTML who's living on the &lt;app.component.html&gt;</p>
          </div>

          <div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <strong class="text-blue-800 dark:text-blue-200">Dynamic Content Example:</strong>
            <span class="text-blue-700 dark:text-blue-300">Items ({{ items.length }})</span>
          </div>

          <div class="space-y-3">
            @for (item of items; track item.id) {
              <div
                class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <span class="text-gray-900 dark:text-white font-medium">{{ item.name }}</span>
                <button
                  (click)="removeItem(item.id)"
                  class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  Remove
                </button>
              </div>
            }
          </div>

          <div class="flex space-x-2">
            <input
              [(ngModel)]="newItemName"
              placeholder="New item name"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              (keyup.enter)="addItem()"
            />
            <button
              (click)="addItem()"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              [disabled]="!newItemName.trim()"
            >
              Add Item
            </button>
          </div>

          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h5 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Code Example</h5>
            <pre
              class="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto"
            ><code>&lt;ngx-custom-modal #htmlInsideModal&gt;
  &lt;ng-template #modalHeader&gt;&lt;h2&gt;HTML inside modal&lt;/h2&gt;&lt;/ng-template&gt;
  &lt;ng-template #modalBody&gt;
    I'm HTML who's living on the template!
    &lt;ul&gt;
      &lt;li *ngFor="let item of items"&gt;{{ '{{' }} item.name {{ '}}' }}&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/ng-template&gt;
&lt;/ngx-custom-modal&gt;</code></pre>
          </div>
        </div>
      </ng-template>
      <ng-template #modalFooter>
        <button
          (click)="htmlInsideModal.close()"
          class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </ng-template>
    </ngx-custom-modal>

    <!-- Nested Modal -->
    <ngx-custom-modal #nestedModal>
      <ng-template #modalHeader>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Nested modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <div class="space-y-6">
          <div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Nested modals can be created by simply adding a &lt;modal&gt; inside a &lt;modal&gt;
            </p>

            <div
              class="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4"
            >
              <strong class="text-yellow-800 dark:text-yellow-200">Note:</strong>
              <span class="text-yellow-700 dark:text-yellow-300"> This demonstrates modal stacking capabilities.</span>
            </div>
          </div>

          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
            <pre
              class="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto"
            ><code>&lt;ngx-custom-modal #nestedModal&gt;
  &lt;ng-template #modalHeader&gt;&lt;h2&gt;Nested modal&lt;/h2&gt;&lt;/ng-template&gt;
  &lt;ng-template #modalBody&gt;
    Nested modals can be created...
    &lt;button (click)="nestedModalX.open()"&gt;Open nested modal&lt;/button&gt;
    &lt;ngx-custom-modal #nestedModalX&gt;
      &lt;ng-template #modalBody&gt;This is the nested modal content.&lt;/ng-template&gt;
    &lt;/ngx-custom-modal&gt;
  &lt;/ng-template&gt;
&lt;/ngx-custom-modal&gt;</code></pre>
          </div>

          <button
            (click)="nestedModalX.open()"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Open nested modal
          </button>

          <!-- Nested Modal Level 2 -->
          <ngx-custom-modal #nestedModalX>
            <ng-template #modalHeader>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Nested Modal (Level 2)</h3>
            </ng-template>
            <ng-template #modalBody>
              <div class="space-y-4">
                <p class="text-gray-700 dark:text-gray-300">This is the nested modal content.</p>
                <p class="text-gray-700 dark:text-gray-300">You can stack multiple modals as needed.</p>

                <button
                  (click)="deepNestedModal.open()"
                  class="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm transition-colors"
                >
                  Go Deeper (Level 3)
                </button>

                <!-- Even deeper nested modal -->
                <ngx-custom-modal #deepNestedModal>
                  <ng-template #modalHeader>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Deep Nested Modal (Level 3)</h4>
                  </ng-template>
                  <ng-template #modalBody>
                    <div class="space-y-4">
                      <p class="text-gray-700 dark:text-gray-300">This is getting pretty deep! 🕳️</p>
                      <div
                        class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                      >
                        <small class="text-blue-700 dark:text-blue-300">
                          In practice, avoid going too deep with nested modals for better UX.
                        </small>
                      </div>
                    </div>
                  </ng-template>
                  <ng-template #modalFooter>
                    <button
                      (click)="deepNestedModal.close()"
                      class="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Close Deep Modal
                    </button>
                  </ng-template>
                </ngx-custom-modal>
              </div>
            </ng-template>
            <ng-template #modalFooter>
              <button
                (click)="closeNestedModal()"
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Close Nested Modal
              </button>
            </ng-template>
          </ngx-custom-modal>
        </div>
      </ng-template>
      <ng-template #modalFooter>
        <button
          (click)="nestedModal.close()"
          class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </ng-template>
    </ngx-custom-modal>

    <!-- Bootstrap Modal Example -->
    <ngx-custom-modal #bootstrapModal>
      <ng-template #modalHeader>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Bootstrap Integration Example</h4>
      </ng-template>
      <ng-template #modalBody>
        <div class="space-y-6">
          <div>
            <h5 class="text-base font-semibold text-gray-900 dark:text-white mb-4">User Registration Form</h5>

            @if (showSuccess) {
              <div
                class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg
                      class="w-5 h-5 text-green-600 dark:text-green-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <strong class="text-green-800 dark:text-green-200">Success!</strong>
                    <span class="text-green-700 dark:text-green-300 ml-1">Registration completed.</span>
                  </div>
                  <button
                    (click)="showSuccess = false"
                    class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            }

            @if (showError) {
              <div class="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg
                      class="w-5 h-5 text-red-600 dark:text-red-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <strong class="text-red-800 dark:text-red-200">Error!</strong>
                    <span class="text-red-700 dark:text-red-300 ml-1">Please check your input.</span>
                  </div>
                  <button
                    (click)="showError = false"
                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            }

            <form [formGroup]="bootstrapForm" (ngSubmit)="onBootstrapSubmit()" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >First Name *</label
                  >
                  <input
                    type="text"
                    id="firstName"
                    formControlName="firstName"
                    class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    [class.border-red-500]="isFieldInvalid('firstName')"
                    [class.border-gray-300]="!isFieldInvalid('firstName')"
                    [class.dark:border-gray-600]="!isFieldInvalid('firstName')"
                  />
                  @if (isFieldInvalid('firstName')) {
                    <div class="text-red-500 text-sm mt-1">First name is required</div>
                  }
                </div>

                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Last Name *</label
                  >
                  <input
                    type="text"
                    id="lastName"
                    formControlName="lastName"
                    class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    [class.border-red-500]="isFieldInvalid('lastName')"
                    [class.border-gray-300]="!isFieldInvalid('lastName')"
                    [class.dark:border-gray-600]="!isFieldInvalid('lastName')"
                  />
                  @if (isFieldInvalid('lastName')) {
                    <div class="text-red-500 text-sm mt-1">Last name is required</div>
                  }
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Email address *</label
                >
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="isFieldInvalid('email')"
                  [class.border-gray-300]="!isFieldInvalid('email')"
                  [class.dark:border-gray-600]="!isFieldInvalid('email')"
                />
                @if (isFieldInvalid('email')) {
                  <div class="text-red-500 text-sm mt-1">Valid email is required</div>
                }
                <div class="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div>
                <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Country</label
                >
                <select
                  id="country"
                  formControlName="country"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose...</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="mx">Mexico</option>
                  <option value="uk">United Kingdom</option>
                </select>
              </div>

              <div class="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  formControlName="acceptTerms"
                  class="mt-1 w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  [class.border-red-500]="isFieldInvalid('acceptTerms')"
                />
                <div class="flex-1">
                  <label for="terms" class="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the Terms and Conditions
                  </label>
                  @if (isFieldInvalid('acceptTerms')) {
                    <div class="text-red-500 text-sm mt-1">You must accept the terms</div>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </ng-template>
      <ng-template #modalFooter>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            (click)="bootstrapModal.close()"
            class="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            (click)="onBootstrapSubmit()"
            [disabled]="bootstrapForm.invalid || isSubmitting"
            class="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            @if (isSubmitting) {
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Registering...
            } @else {
              Register
            }
          </button>
        </div>
      </ng-template>
    </ngx-custom-modal>

    <!-- Custom Configuration Modal -->
    <ngx-custom-modal
      #customModal
      [closeOnOutsideClick]="false"
      [closeOnEscape]="false"
      customClass="custom-modal-example"
    >
      <ng-template #modalHeader>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Advanced Configuration</h2>
      </ng-template>
      <ng-template #modalBody>
        <div class="space-y-6">
          <div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <strong class="text-blue-800 dark:text-blue-200">Configuration:</strong>
            <span class="text-blue-700 dark:text-blue-300">
              This modal cannot be closed by clicking outside or pressing Escape.</span
            >
          </div>

          <div>
            <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Modal Features Demonstrated:</h5>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Custom CSS class applied</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Outside click disabled</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Escape key disabled</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Custom styling</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Form integration</span>
              </li>
            </ul>
          </div>

          <div>
            <h6 class="font-medium text-gray-900 dark:text-white mb-3">Sample Form:</h6>
            <form [formGroup]="customForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  formControlName="message"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                <select
                  formControlName="priority"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </ng-template>
      <ng-template #modalFooter>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            (click)="customModal.close()"
            class="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Manual Close
          </button>
          <button
            (click)="saveCustomForm()"
            class="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </ng-template>
    </ngx-custom-modal>

    <!-- Prevent modal to be dismissed when clicking outside it -->
    <ngx-custom-modal #ignoreClickOutside [closeOnOutsideClick]="false">
      <ng-template #modalHeader>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Click Outside Disabled</h2>
      </ng-template>
      <ng-template #modalBody>
        <p class="text-gray-700 dark:text-gray-300">This modal will not close when clicking outside of it.</p>
      </ng-template>
      <ng-template #modalFooter>
        <button
          (click)="ignoreClickOutside.close()"
          class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </ng-template>
    </ngx-custom-modal>
  `,
  styles: [
    `
      .custom-modal-example .modal-content {
        border: 2px solid #6366f1;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
      }

      .custom-modal-example .modal-header {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        border-bottom: none;
      }

      .custom-modal-example .modal-header h2 {
        color: white;
        margin: 0;
      }

      .custom-modal-example .modal-header .close {
        color: white;
      }
    `,
  ],
})
export class ModalExamplesComponent {
  @Input() currentStyle: StyleMode = 'custom';

  // Template references - these will be accessed from parent component
  @ViewChild('componentInsideModal') componentInsideModal!: NgxCustomModalComponent;
  @ViewChild('htmlInsideModal') htmlInsideModal!: NgxCustomModalComponent;
  @ViewChild('nestedModal') nestedModal!: NgxCustomModalComponent;
  @ViewChild('nestedModalX') nestedModalX!: NgxCustomModalComponent;
  @ViewChild('deepNestedModal') deepNestedModal!: NgxCustomModalComponent;
  @ViewChild('bootstrapModal') bootstrapModal!: NgxCustomModalComponent;
  @ViewChild('customModal') customModal!: NgxCustomModalComponent;
  @ViewChild('ignoreClickOutside') ignoreClickOutside!: NgxCustomModalComponent;

  // HTML Modal data
  items = [
    { id: 1, name: 'First Item' },
    { id: 2, name: 'Second Item' },
    { id: 3, name: 'Third Item' },
  ];
  newItemName = '';

  // Bootstrap form
  bootstrapForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    country: [''],
    acceptTerms: [false, Validators.requiredTrue],
  });

  // Custom form
  customForm = this.fb.group({
    message: ['Sample message'],
    priority: ['medium'],
  });

  isSubmitting = false;
  showSuccess = false;
  showError = false;

  constructor(private fb: FormBuilder) {}

  // HTML Modal methods
  addItem() {
    if (this.newItemName && this.newItemName.trim()) {
      const newItem = {
        id: Date.now(),
        name: this.newItemName.trim(),
      };
      this.items = [...this.items, newItem];
      this.newItemName = '';
      console.log('Item added:', newItem);
      console.log('Current items:', this.items);
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    console.log('Item removed:', id);
    console.log('Current items:', this.items);
  }

  // Nested modal methods
  closeNestedModal() {
    if (this.nestedModalX) {
      this.nestedModalX.close();
    }
  }

  // Bootstrap form methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.bootstrapForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onBootstrapSubmit() {
    if (this.bootstrapForm.valid) {
      this.isSubmitting = true;
      this.showError = false;

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', this.bootstrapForm.value);
        this.showSuccess = true;
        this.bootstrapForm.reset();

        // Close modal after success message
        setTimeout(() => {
          this.bootstrapModal.close();
          this.showSuccess = false;
        }, 2000);
      } catch (error) {
        this.showError = true;
        console.error('Submit error:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.bootstrapForm.controls).forEach(key => {
        this.bootstrapForm.get(key)?.markAsTouched();
      });
    }
  }

  // Custom form methods
  saveCustomForm() {
    console.log('Custom form saved:', this.customForm.value);
    this.customModal.close();
  }
}
