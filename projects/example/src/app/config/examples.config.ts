// projects/example/src/app/config/examples.config.ts
export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags?: string[];
  notes?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface DemoSection {
  id: string;
  title: string;
  description: string;
  example: CodeExample;
  tags?: string[];
  notes?: string;
}

export const DEMO_SECTIONS: DemoSection[] = [
  {
    id: 'component-modal',
    title: 'Component Inside Modal',
    description: 'Embed Angular components directly inside modals with full lifecycle management',
    tags: ['component', 'lifecycle', 'beginner'],
    example: {
      id: 'component-example',
      title: 'Component Modal Example',
      description: 'How to embed Angular components inside modals',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCustomModalComponent } from 'ngx-custom-modal';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, NgxCustomModalComponent, MyComponentComponent],
  template: \`
    <button (click)="modal.open()" class="btn btn-primary">
      Open Component Modal
    </button>

    <ngx-custom-modal #modal>
      <ng-template #modalHeader>
        <h2>Component Modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <app-my-component
          [data]="componentData"
          (dataChanged)="onDataChanged($event)">
        </app-my-component>
      </ng-template>
      <ng-template #modalFooter>
        <button (click)="modal.close()" class="btn btn-secondary">
          Close
        </button>
        <button (click)="saveData()" class="btn btn-primary">
          Save
        </button>
      </ng-template>
    </ngx-custom-modal>
  \`
})
export class ExampleComponent {
  componentData = { name: 'John', email: 'john@example.com' };

  onDataChanged(newData: any) {
    this.componentData = { ...newData };
  }

  saveData() {
    console.log('Saving data:', this.componentData);
    // Implement save logic
  }
}`,
      difficulty: 'beginner',
    },
  },
  {
    id: 'html-modal',
    title: 'HTML Content Modal',
    description: 'Use pure HTML content with template binding and Angular directives',
    tags: ['html', 'templates', 'beginner'],
    example: {
      id: 'html-example',
      title: 'HTML Content Example',
      description: 'Using HTML content with Angular directives',
      language: 'typescript',
      code: `@Component({
  selector: 'app-html-modal',
  template: \`
    <button (click)="htmlModal.open()" class="btn btn-primary">
      Open HTML Modal
    </button>

    <ngx-custom-modal #htmlModal>
      <ng-template #modalHeader>
        <h2>{{ modalTitle }}</h2>
      </ng-template>
      <ng-template #modalBody>
        <div class="content">
          <p>Welcome, {{ userName }}!</p>

          <div class="alert alert-info">
            <strong>Items ({{ items.length }}):</strong>
          </div>

          <ul class="list-group">
            <li *ngFor="let item of items; trackBy: trackByFn"
                class="list-group-item d-flex justify-content-between">
              <span>{{ item.name }}</span>
              <button (click)="removeItem(item.id)"
                      class="btn btn-sm btn-danger">
                Remove
              </button>
            </li>
          </ul>

          <div class="mt-3">
            <input [(ngModel)]="newItemName"
                   placeholder="New item name"
                   class="form-control">
            <button (click)="addItem()"
                    class="btn btn-success mt-2">
              Add Item
            </button>
          </div>
        </div>
      </ng-template>
      <ng-template #modalFooter>
        <button (click)="htmlModal.close()" class="btn btn-secondary">
          Close
        </button>
      </ng-template>
    </ngx-custom-modal>
  \`
})
export class HtmlModalExample {
  modalTitle = 'Dynamic HTML Content';
  userName = 'John Doe';
  newItemName = '';

  items = [
    { id: 1, name: 'First Item' },
    { id: 2, name: 'Second Item' },
    { id: 3, name: 'Third Item' }
  ];

  addItem() {
    if (this.newItemName.trim()) {
      const newItem = {
        id: Date.now(),
        name: this.newItemName.trim()
      };
      this.items.push(newItem);
      this.newItemName = '';
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}`,
      difficulty: 'beginner',
    },
  },
  {
    id: 'nested-modal',
    title: 'Nested Modals',
    description: 'Create complex modal workflows with nested modal support',
    tags: ['nested', 'workflow', 'intermediate'],
    example: {
      id: 'nested-example',
      title: 'Nested Modals Example',
      description: 'Multiple levels of modal stacking',
      language: 'typescript',
      code: `@Component({
  template: \`
    <button (click)="parentModal.open()" class="btn btn-primary">
      Open Workflow Modal
    </button>

    <!-- Level 1: Parent Modal -->
    <ngx-custom-modal #parentModal>
      <ng-template #modalHeader>
        <h2>Step 1: Choose Action</h2>
      </ng-template>
      <ng-template #modalBody>
        <div class="d-grid gap-2">
          <button (click)="confirmModal.open()" class="btn btn-warning">
            Delete Item (Requires Confirmation)
          </button>
          <button (click)="editModal.open()" class="btn btn-info">
            Edit Item
          </button>
          <button (click)="settingsModal.open()" class="btn btn-secondary">
            Advanced Settings
          </button>
        </div>

        <!-- Level 2: Confirmation Modal -->
        <ngx-custom-modal #confirmModal>
          <ng-template #modalHeader>
            <h3 class="text-warning">⚠️ Confirm Deletion</h3>
          </ng-template>
          <ng-template #modalBody>
            <p>Are you sure you want to delete this item?</p>
            <div class="alert alert-warning">
              <strong>Warning:</strong> This action cannot be undone!
            </div>

            <!-- Level 3: Final Confirmation -->
            <ngx-custom-modal #finalConfirmModal>
              <ng-template #modalHeader>
                <h4 class="text-danger">🚨 Final Confirmation</h4>
              </ng-template>
              <ng-template #modalBody>
                <div class="text-center">
                  <p><strong>Last chance!</strong></p>
                  <p>Type "DELETE" to confirm:</p>
                  <input [(ngModel)]="confirmText"
                         class="form-control text-center"
                         placeholder="Type DELETE here">
                </div>
              </ng-template>
              <ng-template #modalFooter>
                <button (click)="finalConfirmModal.close()"
                        class="btn btn-secondary">
                  Cancel
                </button>
                <button (click)="performDelete()"
                        [disabled]="confirmText !== 'DELETE'"
                        class="btn btn-danger">
                  Delete Forever
                </button>
              </ng-template>
            </ngx-custom-modal>
          </ng-template>
          <ng-template #modalFooter>
            <button (click)="confirmModal.close()" class="btn btn-secondary">
              Cancel
            </button>
            <button (click)="finalConfirmModal.open()" class="btn btn-warning">
              Yes, Delete
            </button>
          </ng-template>
        </ngx-custom-modal>

        <!-- Level 2: Edit Modal -->
        <ngx-custom-modal #editModal>
          <ng-template #modalHeader>
            <h3>✏️ Edit Item</h3>
          </ng-template>
          <ng-template #modalBody>
            <form [formGroup]="editForm">
              <div class="mb-3">
                <label class="form-label">Name:</label>
                <input formControlName="name" class="form-control">
              </div>
              <div class="mb-3">
                <label class="form-label">Description:</label>
                <textarea formControlName="description"
                          class="form-control" rows="3">
                </textarea>
              </div>
            </form>
          </ng-template>
          <ng-template #modalFooter>
            <button (click)="editModal.close()" class="btn btn-secondary">
              Cancel
            </button>
            <button (click)="saveEdit()" class="btn btn-primary">
              Save Changes
            </button>
          </ng-template>
        </ngx-custom-modal>
      </ng-template>
      <ng-template #modalFooter>
        <button (click)="parentModal.close()" class="btn btn-secondary">
          Close
        </button>
      </ng-template>
    </ngx-custom-modal>
  \`
})
export class NestedModalExample {
  confirmText = '';

  editForm = this.fb.group({
    name: ['Sample Item'],
    description: ['This is a sample item description']
  });

  constructor(private fb: FormBuilder) {}

  performDelete() {
    if (this.confirmText === 'DELETE') {
      console.log('Item deleted!');
      // Close all modals
      this.finalConfirmModal.close();
      this.confirmModal.close();
      this.parentModal.close();

      // Reset confirmation text
      this.confirmText = '';
    }
  }

  saveEdit() {
    console.log('Saving edit:', this.editForm.value);
    this.editModal.close();
    this.parentModal.close();
  }
}`,
      difficulty: 'intermediate',
    },
  },
];
