// projects/example/src/app/components/hero/hero.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div class="max-w-6xl mx-auto">
        <!-- Hero Content -->
        <div class="text-center mb-8 sm:mb-16">
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 sm:mb-8 animate-scaleIn"
          >
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Lightweight • Standalone • TypeScript
          </div>

          <h2
            class="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight"
          >
            Angular Modal
            <br class="hidden sm:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700"> Component </span>
          </h2>

          <p
            class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            A lightweight, customizable modal component for Angular with full standalone support, nested modals, and
            Bootstrap compatibility.
          </p>

          <!-- Feature Pills -->
          <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            @for (feature of features; track feature) {
              <span
                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-300 font-medium shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                {{ feature }}
              </span>
            }
          </div>
        </div>

        <!-- Installation Cards -->
        <div class="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <!-- Installation -->
          <div
            class="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-green-100 dark:bg-green-950 rounded-xl flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Installation</h3>
            </div>

            <div
              class="bg-gray-900 dark:bg-black rounded-xl p-4 sm:p-6 font-mono text-sm border border-gray-800 overflow-x-auto"
            >
              <div class="flex items-center space-x-2 mb-3">
                <span class="text-green-400">$</span>
                <span class="text-gray-100">npm install ngx-custom-modal</span>
              </div>
              <div class="text-gray-400 text-xs">// or yarn add ngx-custom-modal</div>
            </div>
          </div>

          <!-- Quick Start -->
          <div
            class="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Start</h3>
            </div>

            <div
              class="bg-gray-900 dark:bg-black rounded-xl p-4 sm:p-6 font-mono text-sm border border-gray-800 overflow-x-auto"
            >
              <div class="text-blue-400 mb-2">import</div>
              <div class="text-gray-100 mb-2">{{ '{' }} NgxCustomModalComponent {{ '}' }}</div>
              <div class="text-gray-400 mb-4">from 'ngx-custom-modal';</div>
              <div class="text-yellow-400">&lt;ngx-custom-modal&gt;</div>
              <div class="text-yellow-400">&lt;/ngx-custom-modal&gt;</div>
            </div>
          </div>
        </div>

        <!-- Integration Options -->
        <div class="mt-12 sm:mt-16">
          <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-6 sm:mb-8">
            Choose Your Integration
          </h3>
          <div class="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <!-- Custom Styles -->
            <div
              class="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 border-l-4 border-purple-500 shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                    ></path>
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Custom Styles ⭐</h4>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Build your own design system with complete control over styling and animations.
              </p>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✅ Full design control</li>
                <li>✅ No external dependencies</li>
                <li>✅ Optimized bundle size</li>
                <li>✅ Easy Tailwind integration</li>
              </ul>
            </div>

            <!-- Bootstrap Integration -->
            <div
              class="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 border-l-4 border-blue-500 shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20 0H4C1.8 0 0 1.8 0 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zM8.5 18.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13zm9 0c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13z"
                    />
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Bootstrap Compatible</h4>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Works seamlessly with Bootstrap 3, 4, and 5. No additional configuration required.
              </p>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✅ Bootstrap 3, 4, 5 support</li>
                <li>✅ All Bootstrap classes work</li>
                <li>✅ Zero configuration</li>
                <li>✅ Responsive by default</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center mt-12 sm:mt-16">
          <div class="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/AngelCareaga/ngx-custom-modal"
              target="_blank"
              class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-105 transition-all duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              View on GitHub
            </a>

            <a
              href="https://www.npmjs.com/package/ngx-custom-modal"
              target="_blank"
              class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 5.183H13.82v5.895h-3.564V10.525H5.113L5.13 5.323z"
                />
              </svg>
              View on NPM
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  features = [
    'Standalone Component',
    'Nested Modals',
    'Bootstrap Compatible',
    'TypeScript Support',
    'Custom Content',
    'Event Handling',
    'Lightweight',
  ];
}
