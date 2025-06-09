// projects/example/src/app/components/examples/implementation-guide/implementation-guide.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleMode } from '../../../services/style-toggle.service';

@Component({
  selector: 'app-implementation-guide',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-16 animate-fade-in">
      <div class="card-modern p-8 max-w-6xl mx-auto">
        <h3 class="text-display text-neutral-900 dark:text-neutral-50 mb-8 text-center">
          🚀 Complete Implementation Guide
        </h3>

        <!-- Quick Start Steps -->
        <div class="grid lg:grid-cols-3 gap-6 mb-12">
          <div class="text-center">
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-950 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
            </div>
            <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-2">Install</h4>
            <p class="text-small text-muted">Add ngx-custom-modal to your project</p>
            <div class="mt-3">
              <code class="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded"
                >npm install ngx-custom-modal</code
              >
            </div>
          </div>

          <div class="text-center">
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-950 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">2</span>
            </div>
            <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-2">Import</h4>
            <p class="text-small text-muted">Import the component in your module</p>
            <div class="mt-3">
              <code class="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">NgxCustomModalComponent</code>
            </div>
          </div>

          <div class="text-center">
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-950 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">3</span>
            </div>
            <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-2">Use</h4>
            <p class="text-small text-muted">Add modal to your template</p>
            <div class="mt-3">
              <code class="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">&lt;ngx-custom-modal&gt;</code>
            </div>
          </div>
        </div>

        <!-- Implementation Examples based on current style -->
        <div class="mb-12">
          <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6 text-center">
            📋 {{ currentStyle === 'bootstrap' ? 'Bootstrap' : 'Custom Styles' }} Implementation
          </h4>

          <div class="grid lg:grid-cols-2 gap-8">
            <!-- Installation & Setup -->
            <div class="bg-green-50 dark:bg-green-950 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <h5 class="font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {{ currentStyle === 'bootstrap' ? 'Bootstrap Setup' : 'Standalone Setup' }}
              </h5>

              <div class="space-y-4 text-sm text-green-700 dark:text-green-300">
                <div>
                  <p class="font-medium mb-2">1. Install the package:</p>
                  <div
                    class="bg-white dark:bg-neutral-900 rounded p-3 font-mono text-xs border border-green-200 dark:border-green-700"
                  >
                    <div class="text-green-600">npm install ngx-custom-modal</div>
                  </div>
                </div>

                <div *ngIf="currentStyle === 'bootstrap'">
                  <p class="font-medium mb-2">2. Add Bootstrap CSS:</p>
                  <div
                    class="bg-white dark:bg-neutral-900 rounded p-3 font-mono text-xs border border-green-200 dark:border-green-700"
                  >
                    <div class="text-blue-600">npm install bootstrap</div>
                    <div class="text-neutral-500 mt-1">// Add to angular.json styles array</div>
                  </div>
                </div>

                <div>
                  <p class="font-medium mb-2">{{ currentStyle === 'bootstrap' ? '3' : '2' }}. Import in component:</p>
                  <div
                    class="bg-white dark:bg-neutral-900 rounded p-3 font-mono text-xs border border-green-200 dark:border-green-700"
                  >
                    <div class="text-blue-600">import</div>
                    <div class="ml-2">{{ '{' }} NgxCustomModalComponent {{ '}' }}</div>
                    <div class="text-blue-600">from</div>
                    <div class="ml-2 text-green-600">'ngx-custom-modal';</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Basic Example -->
            <div class="bg-blue-50 dark:bg-blue-950 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h5 class="font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
                Basic Example
              </h5>

              <div
                class="bg-white dark:bg-neutral-900 rounded p-4 font-mono text-xs border border-blue-200 dark:border-blue-700 overflow-x-auto"
              >
                <pre class="text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">{{ getBasicExample() }}</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="mb-12">
          <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6 text-center">🔧 Key Features</h4>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              *ngFor="let feature of features"
              class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800"
            >
              <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                {{ feature.icon }} {{ feature.title }}
              </h5>
              <p class="text-small text-muted mb-3">{{ feature.description }}</p>
              <div class="bg-neutral-100 dark:bg-neutral-800 rounded p-2 text-xs font-mono">
                {{ feature.example }}
              </div>
            </div>
          </div>
        </div>

        <!-- Configuration Options -->
        <div class="mb-12">
          <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6 text-center">⚙️ Configuration Options</h4>

          <div class="grid lg:grid-cols-2 gap-8">
            <div>
              <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Input Properties</h5>
              <div class="space-y-3">
                <div
                  *ngFor="let option of configOptions"
                  class="bg-neutral-50 dark:bg-neutral-900 rounded p-4 border border-neutral-200 dark:border-neutral-800"
                >
                  <code
                    class="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-primary-600 dark:text-primary-400"
                  >
                    {{ option.name }}
                  </code>
                  <span class="text-small text-muted ml-2">{{ option.type }}</span>
                  <p class="text-small text-neutral-700 dark:text-neutral-300 mt-2">{{ option.description }}</p>
                </div>
              </div>
            </div>

            <div>
              <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Template References</h5>
              <div class="space-y-3">
                <div
                  *ngFor="let template of templateRefs"
                  class="bg-neutral-50 dark:bg-neutral-900 rounded p-4 border border-neutral-200 dark:border-neutral-800"
                >
                  <code
                    class="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-green-600 dark:text-green-400"
                  >
                    {{ template.name }}
                  </code>
                  <p class="text-small text-neutral-700 dark:text-neutral-300 mt-2">{{ template.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Practices -->
        <div
          class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 rounded-lg p-8 border border-purple-200 dark:border-purple-800"
        >
          <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6 text-center">💡 Best Practices</h4>

          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-green-600">✅ Do's</h5>
              <ul class="space-y-2 text-small text-neutral-700 dark:text-neutral-300">
                <li *ngFor="let practice of bestPractices.dos" class="flex items-start space-x-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span>{{ practice }}</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 text-red-600">❌ Don'ts</h5>
              <ul class="space-y-2 text-small text-neutral-700 dark:text-neutral-300">
                <li *ngFor="let practice of bestPractices.donts" class="flex items-start space-x-2">
                  <span class="text-red-500 mt-1">✗</span>
                  <span>{{ practice }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Migration Guide (optional) -->
        <div
          *ngIf="showMigrationGuide"
          class="mt-12 bg-amber-50 dark:bg-amber-950 rounded-lg p-8 border border-amber-200 dark:border-amber-800"
        >
          <h4 class="text-heading text-amber-800 dark:text-amber-200 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            Migration from Other Libraries
          </h4>

          <div class="space-y-6">
            <div>
              <h5 class="font-semibold text-amber-800 dark:text-amber-200 mb-3">From ng-bootstrap Modal:</h5>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="text-small font-medium text-amber-700 dark:text-amber-300 mb-2">Before:</p>
                  <div
                    class="bg-white dark:bg-neutral-900 rounded p-3 text-xs font-mono border border-amber-200 dark:border-amber-700"
                  >
                    this.modalService.open(MyComponent)
                  </div>
                </div>
                <div>
                  <p class="text-small font-medium text-amber-700 dark:text-amber-300 mb-2">After:</p>
                  <div
                    class="bg-white dark:bg-neutral-900 rounded p-3 text-xs font-mono border border-amber-200 dark:border-amber-700"
                  >
                    this.modal.open()
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 class="font-semibold text-amber-800 dark:text-amber-200 mb-3">Key Differences:</h5>
              <ul class="text-small text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Template-based approach instead of service injection</li>
                <li>• Better support for nested modals</li>
                <li>• No need for entry components</li>
                <li>• More straightforward component lifecycle</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Toggle Migration Guide -->
        <div class="text-center mt-8">
          <button (click)="toggleMigrationGuide()" class="btn-secondary hover-scale">
            {{ showMigrationGuide ? 'Hide' : 'Show' }} Migration Guide
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ImplementationGuideComponent {
  @Input() currentStyle: StyleMode = 'custom';

  showMigrationGuide = false;

  features = [
    {
      icon: '🎭',
      title: 'Dynamic Content',
      description: 'Load components dynamically based on user actions or data.',
      example: '<app-dynamic-component\n  [componentType]="selectedType">\n</app-dynamic-component>',
    },
    {
      icon: '🔄',
      title: 'Form Integration',
      description: 'Seamlessly integrate with Angular Reactive Forms.',
      example: '<form [formGroup]="form">\n  <input formControlName="email">\n</form>',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Automatically adapts to different screen sizes.',
      example: '@media (max-width: 768px) {\n  .modal { padding: 1rem; }\n}',
    },
    {
      icon: '🎪',
      title: 'Nested Modals',
      description: 'Support for multiple levels of modal stacking.',
      example:
        '<ngx-custom-modal>\n  <ngx-custom-modal>\n    <!-- Nested content -->\n  </ngx-custom-modal>\n</ngx-custom-modal>',
    },
    {
      icon: '🎨',
      title: 'Custom Styling',
      description: 'Full control over modal appearance and animations.',
      example: '[customClass]="my-modal-theme"\n[options]="modalOptions"',
    },
    {
      icon: '⚡',
      title: 'Event Handling',
      description: 'Comprehensive event system for modal interactions.',
      example: '(modalOpened)="onOpen()"\n(modalClosed)="onClose()"',
    },
  ];

  configOptions = [
    {
      name: 'closeOnOutsideClick',
      type: 'boolean',
      description: 'Controls whether the modal closes when clicking outside',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      description: 'Controls whether the modal closes when pressing Escape',
    },
    {
      name: 'customClass',
      type: 'string',
      description: 'Custom CSS class to apply to the modal container',
    },
    {
      name: 'hideCloseButton',
      type: 'boolean',
      description: 'Hides the default close button in the header',
    },
    {
      name: 'options',
      type: 'ModalOptions',
      description: 'Configuration object for all modal options',
    },
  ];

  templateRefs = [
    {
      name: '#modalHeader',
      description: 'Template reference for the modal header content',
    },
    {
      name: '#modalBody',
      description: 'Template reference for the modal body content (required)',
    },
    {
      name: '#modalFooter',
      description: 'Template reference for the modal footer content',
    },
  ];

  bestPractices = {
    dos: [
      'Use TypeScript interfaces for modal options',
      'Implement proper loading states for async operations',
      'Test modal behavior on mobile devices',
      'Use semantic HTML and ARIA attributes',
      'Handle form validation within modal context',
      'Always provide meaningful header content',
    ],
    donts: [
      'Forget to call close() in component ngOnDestroy',
      'Create memory leaks with unsubscribed observables',
      'Use inline styles for complex modal layouts',
      'Ignore z-index conflicts with other UI elements',
      'Nest more than 3 levels without UX consideration',
      'Skip accessibility considerations',
    ],
  };

  toggleMigrationGuide() {
    this.showMigrationGuide = !this.showMigrationGuide;
  }

  getBasicExample(): string {
    if (this.currentStyle === 'bootstrap') {
      return `@Component({
  standalone: true,
  imports: [NgxCustomModalComponent],
  template: \`
    <button class="btn btn-primary"
            (click)="modal.open()">
      Open Modal
    </button>

    <ngx-custom-modal #modal>
      <ng-template #modalHeader>
        <h4 class="modal-title">Bootstrap Modal</h4>
      </ng-template>
      <ng-template #modalBody>
        <p>This modal uses Bootstrap styling!</p>
      </ng-template>
      <ng-template #modalFooter>
        <button class="btn btn-secondary"
                (click)="modal.close()">
          Close
        </button>
      </ng-template>
    </ngx-custom-modal>
  \`
})`;
    } else {
      return `@Component({
  standalone: true,
  imports: [NgxCustomModalComponent],
  template: \`
    <button (click)="modal.open()">
      Open Modal
    </button>

    <ngx-custom-modal #modal>
      <ng-template #modalHeader>
        <h2>Modal Title</h2>
      </ng-template>
      <ng-template #modalBody>
        <p>Modal content goes here!</p>
      </ng-template>
    </ngx-custom-modal>
  \`
})`;
    }
  }
}
