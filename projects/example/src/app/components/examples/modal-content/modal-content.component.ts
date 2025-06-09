// projects/example/src/app/components/examples/modal-content/modal-content.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m10 0H7m5-4v4m0 0v4"
            ></path>
          </svg>
        </div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dynamic Component</h4>
        <p class="text-gray-600 dark:text-gray-300">
          I'm &lt;app-modal-content&gt; and I'm only brought to life by the modal component. This component will get
          destroyed when the modal is closed.
        </p>
      </div>

      <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <h5 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Component Lifecycle</h5>
        <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li class="flex items-center space-x-2">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>✅ Component initialized when modal opens</span>
          </li>
          <li class="flex items-center space-x-2">
            <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span>⚡ Component destroyed when modal closes</span>
          </li>
          <li class="flex items-center space-x-2">
            <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>🔄 Full Angular lifecycle preserved</span>
          </li>
        </ul>
      </div>

      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
        <h5 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Code Example</h5>
        <pre
          class="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto"
        ><code>&lt;ngx-custom-modal #componentInsideModal&gt;
  &lt;ng-template #modalHeader&gt;
    &lt;h2&gt;Component inside modal&lt;/h2&gt;
  &lt;/ng-template&gt;
  &lt;ng-template #modalBody&gt;
    &lt;app-modal-content&gt;&lt;/app-modal-content&gt;
  &lt;/ng-template&gt;
&lt;/ngx-custom-modal&gt;</code></pre>
      </div>

      <div class="flex items-center justify-center space-x-2 pt-4 border-t border-gray-200 dark:border-gray-800">
        <span class="text-sm text-gray-600 dark:text-gray-400">Powered by</span>
        <span
          class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 rounded text-xs font-medium"
        >
          ng-template
        </span>
      </div>
    </div>
  `,
})
export class ModalContentComponent {}
