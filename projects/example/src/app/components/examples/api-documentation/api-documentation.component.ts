import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import API configurations
import {
  API_PROPERTIES,
  API_TEMPLATE_REFS,
  API_METHODS,
  API_EVENTS,
  MODAL_OPTIONS_INTERFACE,
  USAGE_EXAMPLES,
} from '../../../config/api.config';

@Component({
  selector: 'app-api-documentation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-16 animate-fade-in">
      <div class="card-modern p-8 max-w-6xl mx-auto">
        <h3 class="text-display text-neutral-900 dark:text-neutral-50 mb-8 text-center">📚 Complete API Reference</h3>

        <!-- Quick Usage Examples -->
        <div class="mb-12">
          <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6">⚡ Quick Start Examples</h4>

          <div class="grid md:grid-cols-3 gap-6">
            @for (example of Object.entries(usageExamples); track example[0]) {
              <div
                class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800"
              >
                <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 capitalize">{{ example[0] }}</h5>
                <pre
                  class="text-xs bg-neutral-900 dark:bg-black text-neutral-100 p-3 rounded overflow-x-auto"
                ><code>{{ example[1] }}</code></pre>
              </div>
            }
          </div>
        </div>

        <!-- Component Properties -->
        <div class="mb-12">
          <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Input Properties
          </h4>

          <div class="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
            <table class="w-full">
              <thead class="bg-neutral-50 dark:bg-neutral-900">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Property
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Default
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Required
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-neutral-950 divide-y divide-neutral-200 dark:divide-neutral-800">
                @for (property of inputProperties; track property.name) {
                  <tr class="hover:bg-neutral-50 dark:hover:bg-neutral-900">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <code
                        class="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-primary-600 dark:text-primary-400"
                      >
                        {{ property.name }}
                      </code>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <code class="text-sm font-mono text-neutral-600 dark:text-neutral-400">{{ property.type }}</code>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <code class="text-sm font-mono text-neutral-600 dark:text-neutral-400">{{
                        property.default || '-'
                      }}</code>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span [class]="property.required ? 'text-red-600 font-semibold' : 'text-neutral-500'">
                        {{ property.required ? 'Yes' : 'No' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-neutral-900 dark:text-neutral-100">
                      {{ property.description }}
                      @if (property.example) {
                        <div class="mt-2">
                          <code class="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">{{
                            property.example
                          }}</code>
                        </div>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Template References -->
        <div class="mb-12">
          <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            Template References
          </h4>

          <div class="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
            <table class="w-full">
              <thead class="bg-neutral-50 dark:bg-neutral-900">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Template Ref
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Required
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-neutral-950 divide-y divide-neutral-200 dark:divide-neutral-800">
                @for (template of templateReferences; track template.name) {
                  <tr class="hover:bg-neutral-50 dark:hover:bg-neutral-900">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <code
                        class="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-green-600 dark:text-green-400"
                      >
                        {{ template.name }}
                      </code>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <code class="text-sm font-mono text-neutral-600 dark:text-neutral-400">{{ template.type }}</code>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span [class]="template.required ? 'text-red-600 font-semibold' : 'text-neutral-500'">
                        {{ template.required ? 'Yes' : 'No' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-neutral-900 dark:text-neutral-100">
                      {{ template.description }}
                      @if (template.example) {
                        <div class="mt-2">
                          <code class="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">{{
                            template.example
                          }}</code>
                        </div>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Methods -->
        <div class="mb-12">
          <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              ></path>
            </svg>
            Public Methods
          </h4>

          <div class="grid gap-4">
            @for (method of publicMethods; track method.name) {
              <div
                class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800"
              >
                <div class="flex items-start justify-between mb-3">
                  <code
                    class="text-lg font-mono bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded text-blue-600 dark:text-blue-400"
                  >
                    {{ method.name }}{{ method.parameters || '()' }}
                  </code>
                  <span class="text-sm bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                    returns {{ method.returns }}
                  </span>
                </div>
                <p class="text-neutral-700 dark:text-neutral-300 mb-3">{{ method.description }}</p>
                @if (method.example) {
                  <div class="bg-neutral-900 dark:bg-black rounded p-3">
                    <code class="text-sm text-neutral-100">{{ method.example }}</code>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Events -->
        @if (apiEvents.length > 0) {
          <div class="mb-12">
            <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6 flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-5 5v-5zM4 19V5a2 2 0 012-2h7a2 2 0 012 2v8l-3-3-3 3V5H6v14h7"
                ></path>
              </svg>
              Events
            </h4>

            <div class="grid gap-4">
              @for (event of apiEvents; track event.name) {
                <div
                  class="bg-purple-50 dark:bg-purple-950 rounded-lg p-6 border border-purple-200 dark:border-purple-800"
                >
                  <div class="flex items-start justify-between mb-3">
                    <code
                      class="text-lg font-mono bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded text-purple-600 dark:text-purple-400"
                    >
                      ({{ event.name }})
                    </code>
                    @if (event.payload) {
                      <span
                        class="text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded"
                      >
                        payload: {{ event.payload }}
                      </span>
                    }
                  </div>
                  <p class="text-purple-700 dark:text-purple-300 mb-3">{{ event.description }}</p>
                  @if (event.example) {
                    <div class="bg-neutral-900 dark:bg-black rounded p-3">
                      <code class="text-sm text-neutral-100">{{ event.example }}</code>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- ModalOptions Interface -->
        <div class="mb-12">
          <h4 class="text-heading text-neutral-900 dark:text-neutral-50 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
            ModalOptions Interface
          </h4>

          <div class="bg-neutral-900 dark:bg-black rounded-xl p-6 border border-neutral-800">
            <pre class="text-neutral-100 text-sm"><code>{{ modalOptionsInterface }}</code></pre>
          </div>
        </div>

        <!-- Best Practices Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-green-50 dark:bg-green-950 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h5 class="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              ✅ Best Practices
            </h5>
            <ul class="text-sm text-green-700 dark:text-green-300 space-y-2">
              <li>• Always provide meaningful header content</li>
              <li>• Use proper ARIA labels for accessibility</li>
              <li>• Implement loading states for async operations</li>
              <li>• Test modal behavior on mobile devices</li>
              <li>• Handle form validation in modal context</li>
              <li>• Use TypeScript interfaces for type safety</li>
            </ul>
          </div>

          <div class="bg-amber-50 dark:bg-amber-950 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
            <h5 class="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
              ⚠️ Common Gotchas
            </h5>
            <ul class="text-sm text-amber-700 dark:text-amber-300 space-y-2">
              <li>• Don't forget to call close() in ngOnDestroy</li>
              <li>• Avoid memory leaks with unsubscribed observables</li>
              <li>• Be careful with z-index conflicts</li>
              <li>• Test nested modal behavior thoroughly</li>
              <li>• Consider modal stacking limits (UX)</li>
              <li>• Handle focus management properly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ApiDocumentationComponent {
  // Load configurations
  inputProperties = API_PROPERTIES;
  templateReferences = API_TEMPLATE_REFS;
  publicMethods = API_METHODS;
  apiEvents = API_EVENTS;
  modalOptionsInterface = MODAL_OPTIONS_INTERFACE;
  usageExamples = USAGE_EXAMPLES;
  protected readonly Object = Object;
}
