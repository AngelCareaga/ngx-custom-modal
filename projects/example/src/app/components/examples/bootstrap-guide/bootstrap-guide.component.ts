// projects/example/src/app/components/examples/bootstrap-guide/bootstrap-guide.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bootstrap-guide',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-blue-50 dark:bg-blue-950 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M20 0H4C1.8 0 0 1.8 0 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zM8.5 18.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13zm9 0c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13z"
            />
          </svg>
        </div>
        <div>
          <h4 class="text-lg font-semibold text-blue-800 dark:text-blue-200">Bootstrap Integration Mode</h4>
          <p class="text-sm text-blue-600 dark:text-blue-300">Complete Bootstrap compatibility documentation</p>
        </div>
      </div>

      <div class="space-y-4">
        <div class="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
          <h5 class="font-semibold text-blue-800 dark:text-blue-200 mb-3">✨ Why Bootstrap Integration?</h5>
          <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-2">
            <li class="flex items-start space-x-2">
              <span class="text-blue-500 mt-1">•</span>
              <span><strong>Zero Configuration:</strong> Works out of the box with Bootstrap 3, 4, and 5</span>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-blue-500 mt-1">•</span>
              <span><strong>Familiar Classes:</strong> Use standard Bootstrap modal, button, and form classes</span>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-blue-500 mt-1">•</span>
              <span><strong>Responsive Design:</strong> Bootstrap's responsive utilities work seamlessly</span>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-blue-500 mt-1">•</span>
              <span><strong>Component Library:</strong> Leverage Bootstrap's entire component ecosystem</span>
            </li>
          </ul>
        </div>

        <div class="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
          <h5 class="font-semibold text-blue-800 dark:text-blue-200 mb-3">🚀 Quick Setup</h5>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">1. Install Bootstrap:</p>
              <code class="text-xs bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                npm install bootstrap
              </code>
            </div>
            <div>
              <p class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">2. Add to angular.json:</p>
              <code class="text-xs bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                "node_modules/bootstrap/dist/css/bootstrap.min.css"
              </code>
            </div>
            <div>
              <p class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">3. Use Bootstrap classes:</p>
              <code class="text-xs bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                class="btn btn-primary modal-title form-control"
              </code>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
          <h5 class="font-semibold text-blue-800 dark:text-blue-200 mb-3">📋 Examples Focus</h5>
          <p class="text-sm text-blue-700 dark:text-blue-300 mb-3">
            The examples below demonstrate Bootstrap integration patterns, showing how to:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span class="text-blue-600 dark:text-blue-400">Use Bootstrap form classes</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span class="text-blue-600 dark:text-blue-400">Implement validation styles</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span class="text-blue-600 dark:text-blue-400">Create responsive layouts</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span class="text-blue-600 dark:text-blue-400">Apply component patterns</span>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-4 border border-blue-200 dark:border-blue-700"
        >
          <div class="flex items-start space-x-3">
            <svg
              class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h6 class="font-semibold text-blue-800 dark:text-blue-200 text-sm">Bootstrap Versions</h6>
              <p class="text-xs text-blue-700 dark:text-blue-300 mt-1">
                ngx-custom-modal is compatible with Bootstrap 3, 4, and 5. The examples work across all versions with
                minimal adjustments to class names.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BootstrapGuideComponent {}
