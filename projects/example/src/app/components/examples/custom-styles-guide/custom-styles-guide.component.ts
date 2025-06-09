// projects/example/src/app/components/examples/custom-styles-guide/custom-styles-guide.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-styles-guide',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-purple-50 dark:bg-purple-950 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
            ></path>
          </svg>
        </div>
        <div>
          <h4 class="text-lg font-semibold text-purple-800 dark:text-purple-200">Custom Styles Mode ⭐</h4>
          <p class="text-sm text-purple-600 dark:text-purple-300">Recommended approach for modern applications</p>
        </div>
      </div>

      <div class="space-y-4">
        <div class="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
          <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-3">🎨 Why Custom Styles?</h5>
          <ul class="text-sm text-purple-700 dark:text-purple-300 space-y-2">
            <li class="flex items-start space-x-2">
              <span class="text-purple-500 mt-1">•</span>
              <span><strong>Complete Control:</strong> Full control over design system and branding</span>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-purple-500 mt-1">•</span>
              <span><strong>Optimized Bundle:</strong> No external CSS dependencies, smaller bundle size</span>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-purple-500 mt-1">•</span>
              <span><strong>Modern Workflow:</strong> Perfect for Tailwind CSS and CSS-in-JS solutions</span>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-purple-500 mt-1">•</span>
              <span><strong>Framework Agnostic:</strong> Works with any CSS framework or methodology</span>
            </li>
          </ul>
        </div>

        <div class="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
          <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-3">⚡ Quick Setup</h5>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">1. Install ngx-custom-modal:</p>
              <code
                class="text-xs bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 px-2 py-1 rounded"
              >
                npm install ngx-custom-modal
              </code>
            </div>
            <div>
              <p class="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">2. Import component:</p>
              <code
                class="text-xs bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 px-2 py-1 rounded"
              >
                imports: [NgxCustomModalComponent]
              </code>
            </div>
            <div>
              <p class="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">3. Add your styles:</p>
              <code
                class="text-xs bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 px-2 py-1 rounded"
              >
                customClass="my-modal-theme"
              </code>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
          <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-3">🎯 Integration Options</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <h6 class="text-sm font-medium text-purple-700 dark:text-purple-300">CSS Frameworks:</h6>
              <div class="space-y-1 text-xs">
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span class="text-purple-600 dark:text-purple-400">Tailwind CSS</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span class="text-purple-600 dark:text-purple-400">UnoCSS</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span class="text-purple-600 dark:text-purple-400">Custom CSS</span>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <h6 class="text-sm font-medium text-purple-700 dark:text-purple-300">Methodologies:</h6>
              <div class="space-y-1 text-xs">
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span class="text-purple-600 dark:text-purple-400">BEM</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span class="text-purple-600 dark:text-purple-400">CSS Modules</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span class="text-purple-600 dark:text-purple-400">Styled Components</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
          <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-3">📋 Examples Focus</h5>
          <p class="text-sm text-purple-700 dark:text-purple-300 mb-3">
            The examples below showcase custom styling approaches, demonstrating:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span class="text-purple-600 dark:text-purple-400">Tailwind CSS integration</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span class="text-purple-600 dark:text-purple-400">Custom animations</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span class="text-purple-600 dark:text-purple-400">Dark mode support</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span class="text-purple-600 dark:text-purple-400">Design system patterns</span>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-lg p-4 border border-purple-200 dark:border-purple-700"
        >
          <div class="flex items-start space-x-3">
            <svg
              class="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              ></path>
            </svg>
            <div>
              <h6 class="font-semibold text-purple-800 dark:text-purple-200 text-sm">Pro Tip</h6>
              <p class="text-xs text-purple-700 dark:text-purple-300 mt-1">
                Start with custom styles for complete control over your design system. You can always add
                framework-specific classes later without changing the modal implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CustomStylesGuideComponent {}
