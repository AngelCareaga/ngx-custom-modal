// projects/example/src/app/components/examples/demo-section/demo-section.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeToggleService } from '../../../services/code-toggle.service';

@Component({
  selector: 'app-demo-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:-translate-y-1 transition-all duration-300 animate-fadeIn"
    >
      <div class="flex flex-col sm:flex-row sm:items-start justify-between mb-6">
        <div class="flex-1 mb-4 sm:mb-0">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ title }}</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">{{ description }}</p>

          <!-- Feature Tags -->
          @if (tags && tags.length > 0) {
            <div class="flex flex-wrap gap-2 mb-4">
              @for (tag of tags; track tag) {
                <span
                  class="px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded text-xs font-medium"
                >
                  {{ tag }}
                </span>
              }
            </div>
          }
        </div>

        <button
          (click)="toggleCode()"
          class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
        >
          <svg
            class="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <span class="text-sm font-medium">
            {{ isCodeShown() ? 'Hide Code' : 'View Code' }}
          </span>
        </button>
      </div>

      <div class="space-y-6">
        <!-- Demo Area -->
        <ng-content></ng-content>

        <!-- Code Display -->
        @if (isCodeShown()) {
          <div class="rounded-xl overflow-hidden animate-slideUp">
            <div
              class="bg-gray-900 dark:bg-black text-gray-100 p-4 sm:p-6 rounded-xl text-sm overflow-x-auto border border-gray-800"
            >
              <!-- Language indicator -->
              <div class="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
                <span class="text-xs text-gray-400 font-medium">{{ codeLanguage || 'TypeScript' }}</span>
                <button
                  (click)="copyCode()"
                  class="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                  [class.text-green-400]="isCopied"
                >
                  {{ isCopied ? 'Copied!' : 'Copy' }}
                </button>
              </div>
              <pre class="!m-0"><code [innerHTML]="highlightedCode"></code></pre>
            </div>
          </div>
        }

        <!-- Additional Notes -->
        @if (notes) {
          <div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
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
              <div class="text-sm text-blue-700 dark:text-blue-300" [innerHTML]="notes"></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class DemoSectionComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() code: string = '';
  @Input() codeId: string = '';
  @Input() codeLanguage: string = 'TypeScript';
  @Input() tags: string[] = [];
  @Input() notes?: string;

  isCopied = false;

  constructor(private codeToggleService: CodeToggleService) {}

  toggleCode() {
    this.codeToggleService.toggle(this.codeId);
  }

  isCodeShown(): boolean {
    return this.codeToggleService.isShown(this.codeId);
  }

  get highlightedCode(): string {
    // Simple syntax highlighting - you can integrate with prism.js or highlight.js
    return this.code
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-green-400">$&</span>')
      .replace(/\/\/.*$/gm, '<span class="text-green-400">$&</span>')
      .replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-yellow-300">$&</span>')
      .replace(
        /\b(class|interface|export|import|from|const|let|var|function|return|if|else|for|while|try|catch|throw|new|this|super|extends|implements|public|private|protected|static|readonly|async|await|@Component|@Injectable|@Input|@Output)\b/g,
        '<span class="text-blue-400">$&</span>'
      );
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.code);
      this.isCopied = true;
      setTimeout(() => (this.isCopied = false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }
}
