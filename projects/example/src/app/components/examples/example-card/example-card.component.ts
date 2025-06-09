import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeToggleService } from '../../../services/code-toggle.service';

@Component({
  selector: 'app-example-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-modern p-8 mb-8 hover-lift animate-fade-in">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h3 class="text-heading text-neutral-900 dark:text-neutral-50 mb-2">{{ title }}</h3>
          <p class="text-small text-muted">Interactive example with live preview</p>
        </div>
        <button (click)="toggleCode()" class="btn-ghost group">
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
          <span class="text-small font-medium">
            {{ isCodeShown() ? 'Hide Code' : 'View Code' }}
          </span>
        </button>
      </div>

      <div class="space-y-6">
        <div class="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <ng-content></ng-content>
        </div>

        @if (isCodeShown()) {
          <div class="rounded-xl overflow-hidden animate-slide-up">
            <pre
              class="!m-0 bg-neutral-900 dark:bg-black text-neutral-100 p-6 rounded-xl text-sm overflow-x-auto border border-neutral-800"
            ><code>{{ code }}</code></pre>
          </div>
        }
      </div>
    </div>
  `,
})
export class ExampleCardComponent {
  @Input() title: string = '';
  @Input() code: string = '';
  @Input() codeId: string = '';

  constructor(private codeToggleService: CodeToggleService) {}

  toggleCode() {
    this.codeToggleService.toggle(this.codeId);
  }

  isCodeShown(): boolean {
    return this.codeToggleService.isShown(this.codeId);
  }
}
