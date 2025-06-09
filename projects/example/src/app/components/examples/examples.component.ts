// projects/example/src/app/components/examples/examples.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesHeaderComponent } from './examples-header/examples-header.component';
import { DemoSectionComponent } from './demo-section/demo-section.component';
import { ApiDocumentationComponent } from './api-documentation/api-documentation.component';
import { ImplementationGuideComponent } from './implementation-guide/implementation-guide.component';
import { ModalExamplesComponent } from './modal-examples/modal-examples.component';
import { ProgrammaticDemoComponent } from './programmatic-demo/programmatic-demo.component';
import { StyleMode, StyleToggleService } from '../../services/style-toggle.service';

// Import configurations
import { DEMO_SECTIONS } from '../../config/examples.config';
import { BOOTSTRAP_EXAMPLES } from '../../config/bootstrap-examples.config';
import { ADVANCED_EXAMPLES } from '../../config/advanced-examples.config';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [
    CommonModule,
    ExamplesHeaderComponent,
    DemoSectionComponent,
    ApiDocumentationComponent,
    ImplementationGuideComponent,
    ModalExamplesComponent,
    ProgrammaticDemoComponent,
  ],
  template: `
    <main class="bg-white dark:bg-gray-950 py-8 sm:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <app-examples-header [currentStyle]="currentStyle" (styleChanged)="onStyleChanged($event)">
        </app-examples-header>

        <!-- Examples Grid -->
        <div class="space-y-6 sm:space-y-8">
          @for (section of demoSections; track section.id) {
            <app-demo-section
              [title]="section.title"
              [description]="section.description"
              [code]="section.example.code"
              [codeId]="section.example.id"
              [codeLanguage]="section.example.language"
              [tags]="section.tags || []"
              [notes]="section.notes"
            >
              @switch (section.id) {
                @case ('component-modal') {
                  <div
                    class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
                  >
                    <button
                      (click)="openComponentModal()"
                      class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl hover:scale-105 transition-all duration-200"
                    >
                      Open Component Modal
                    </button>
                  </div>
                }
                @case ('html-modal') {
                  <div
                    class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
                  >
                    <button
                      (click)="openHtmlModal()"
                      class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl hover:scale-105 transition-all duration-200"
                    >
                      Open HTML Modal
                    </button>
                  </div>
                }
                @case ('nested-modal') {
                  <div
                    class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
                  >
                    <button
                      (click)="openNestedModal()"
                      class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl hover:scale-105 transition-all duration-200"
                    >
                      Open Nested Modal
                    </button>
                  </div>
                }
              }
            </app-demo-section>
          }

          <!-- Bootstrap Examples -->
          @if (currentStyle === 'bootstrap') {
            @for (example of bootstrapExamples; track example.id) {
              <app-demo-section
                [title]="example.title"
                [description]="example.description"
                [code]="example.code"
                [codeId]="example.id"
                [codeLanguage]="example.language"
              >
                <div
                  class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
                >
                  <button
                    (click)="openBootstrapModal()"
                    class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl hover:scale-105 transition-all duration-200"
                  >
                    View Bootstrap Example
                  </button>
                </div>
              </app-demo-section>
            }
          }

          <!-- Advanced Examples -->
          @for (example of advancedExamples; track example.id) {
            <app-demo-section
              [title]="example.title"
              [description]="example.description"
              [code]="example.code"
              [codeId]="example.id"
              [codeLanguage]="example.language"
            >
              <div
                class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
              >
                <button
                  (click)="openCustomModal()"
                  class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl hover:scale-105 transition-all duration-200"
                >
                  Try Advanced Features
                </button>
              </div>
            </app-demo-section>
          }

          <!-- Programmatic Demo Section -->
          <app-demo-section
            title="Programmatic Control"
            description="Control modals programmatically with service injection"
            [code]="programmaticExampleCode"
            codeId="programmaticExample"
            [tags]="['service', 'programmatic', 'advanced']"
          >
            <div class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              <app-programmatic-demo></app-programmatic-demo>
            </div>
          </app-demo-section>
        </div>

        <!-- Implementation Guide -->
        <app-implementation-guide [currentStyle]="currentStyle"></app-implementation-guide>

        <!-- API Documentation -->
        <app-api-documentation></app-api-documentation>
      </div>

      <!-- Modal Examples Container -->
      <app-modal-examples #modalExamples [currentStyle]="currentStyle"> </app-modal-examples>
    </main>
  `,
})
export class ExamplesComponent implements OnInit {
  @ViewChild('modalExamples') modalExamples!: ModalExamplesComponent;

  currentStyle: StyleMode = 'custom';

  // Load configurations
  demoSections = DEMO_SECTIONS;
  bootstrapExamples = BOOTSTRAP_EXAMPLES;
  advancedExamples = ADVANCED_EXAMPLES;

  // Programmatic example code
  programmaticExampleCode = `// Service-based modal management
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals = new Map<string, NgxCustomModalComponent>();

  register(id: string, modal: NgxCustomModalComponent) {
    this.modals.set(id, modal);
  }

  open(id: string): Promise<any> {
    const modal = this.modals.get(id);
    if (modal) {
      modal.open();
    }
  }

  close(id: string) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.close();
    }
  }
}

// Component usage
@Component({
  template: \`
    <button (click)="openModal()">Open Modal</button>
  \`
})
export class MyComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.open('my-modal');
  }
}`;

  constructor(private styleToggleService: StyleToggleService) {}

  ngOnInit() {
    this.styleToggleService.currentStyle$.subscribe(style => {
      this.currentStyle = style;
    });
  }

  onStyleChanged(newStyle: StyleMode) {
    this.styleToggleService.setStyle(newStyle);
  }

  // Modal control methods
  openComponentModal() {
    this.modalExamples?.componentInsideModal?.open();
  }

  openHtmlModal() {
    this.modalExamples?.htmlInsideModal?.open();
  }

  openNestedModal() {
    this.modalExamples?.nestedModal?.open();
  }

  openBootstrapModal() {
    this.modalExamples?.bootstrapModal?.open();
  }

  openCustomModal() {
    this.modalExamples?.customModal?.open();
  }
}
