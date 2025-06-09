// projects/example/src/app/components/examples/examples-header/examples-header.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleMode } from '../../../services/style-toggle.service';
import { BootstrapGuideComponent } from '../bootstrap-guide/bootstrap-guide.component';
import { CustomStylesGuideComponent } from '../custom-styles-guide/custom-styles-guide.component';

@Component({
  selector: 'app-examples-header',
  standalone: true,
  imports: [CommonModule, BootstrapGuideComponent, CustomStylesGuideComponent],
  template: `
    <div class="text-center mb-8 sm:mb-16 animate-fadeIn">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Interactive Examples & API Documentation
      </h2>
      <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
        Explore comprehensive examples showcasing ngx-custom-modal's capabilities. From basic usage to advanced
        configurations, learn how to integrate modals seamlessly with Angular standalone components.
      </p>

      <!-- Documentation Mode Indicator -->
      <div class="max-w-4xl mx-auto mb-6 sm:mb-8">
        <div
          class="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mb-4"
        >
          <span
            class="w-2 h-2 rounded-full mr-2 transition-colors duration-200"
            [class.bg-purple-500]="currentStyle === 'custom'"
            [class.bg-blue-500]="currentStyle === 'bootstrap'"
          ></span>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Showing {{ currentStyle === 'custom' ? 'Custom Styles (Recommended)' : 'Bootstrap Code Examples' }}
          </span>
        </div>

        <!-- Documentation Mode Content -->
        @if (currentStyle === 'bootstrap') {
          <app-bootstrap-guide></app-bootstrap-guide>
        } @else {
          <app-custom-styles-guide></app-custom-styles-guide>
        }
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
        <div class="text-center">
          <div class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">17-20</div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Angular Support</div>
        </div>
        <div class="text-center">
          <div class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">0</div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Dependencies</div>
        </div>
        <div class="text-center">
          <div class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">∞</div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Nested Levels</div>
        </div>
        <div class="text-center">
          <div class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">TypeScript</div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Ready</div>
        </div>
      </div>
    </div>
  `,
})
export class ExamplesHeaderComponent {
  @Input() currentStyle: StyleMode = 'custom';
  @Output() styleChanged = new EventEmitter<StyleMode>();

  onStyleToggle() {
    const newStyle = this.currentStyle === 'custom' ? 'bootstrap' : 'custom';
    this.styleChanged.emit(newStyle);
  }
}
