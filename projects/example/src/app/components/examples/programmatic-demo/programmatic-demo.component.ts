// projects/example/src/app/components/examples/programmatic-demo/programmatic-demo.component.ts
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgxCustomModalComponent } from 'ngx-custom-modal';

@Component({
  selector: 'app-programmatic-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxCustomModalComponent],
  template: `
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          (click)="showConfirmation()"
          class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
        >
          Delete Item
        </button>
        <button
          (click)="showUserForm()"
          class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          Add User
        </button>
        <button
          (click)="showSettings()"
          class="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors"
        >
          Settings
        </button>
      </div>

      <div class="text-sm text-gray-600 dark:text-gray-300">
        <p>Programmatic modal control examples:</p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li>Confirmation dialogs with callbacks</li>
          <li>Form modals with validation</li>
          <li>Chained modal workflows</li>
        </ul>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <ngx-custom-modal #confirmModal [closeOnOutsideClick]="false">
      <ng-template #modalHeader>
        <h4 class="text-red-600 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
          Confirm Deletion
        </h4>
      </ng-template>
      <ng-template #modalBody>
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">Are you sure you want to delete this item?</p>
          <div class="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded p-3">
            <p class="text-red-700 dark:text-red-300 text-sm">
              <strong>Warning:</strong> This action cannot be undone!
            </p>
          </div>
        </div>
      </ng-template>
      <ng-template #modalFooter>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            (click)="confirmModal.close()"
            class="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            (click)="handleDelete()"
            class="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </ng-template>
    </ngx-custom-modal>

    <!-- User Form Modal -->
    <ngx-custom-modal #userFormModal>
      <ng-template #modalHeader>
        <h4 class="flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          Add New User
        </h4>
      </ng-template>
      <ng-template #modalBody>
        <form [formGroup]="userForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input
              type="text"
              formControlName="name"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            @if (userForm.get('name')?.invalid && userForm.get('name')?.touched) {
              <div class="text-red-500 text-sm mt-1">Name is required</div>
            }
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              formControlName="email"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            @if (userForm.get('email')?.invalid && userForm.get('email')?.touched) {
              <div class="text-red-500 text-sm mt-1">Valid email is required</div>
            }
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
            <select
              formControlName="role"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
        </form>
      </ng-template>
      <ng-template #modalFooter>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            (click)="userFormModal.close()"
            class="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            (click)="handleUserSubmit()"
            [disabled]="userForm.invalid"
            class="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
          >
            Add User
          </button>
        </div>
      </ng-template>
    </ngx-custom-modal>

    <!-- Settings Modal -->
    <ngx-custom-modal #settingsModal>
      <ng-template #modalHeader>
        <h4 class="flex items-center">
          <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          Settings
        </h4>
      </ng-template>
      <ng-template #modalBody>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                [(ngModel)]="settings.notifications"
                class="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span class="text-gray-700 dark:text-gray-300">Enable notifications</span>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                [(ngModel)]="settings.autoSave"
                class="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span class="text-gray-700 dark:text-gray-300">Auto-save changes</span>
            </label>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Theme</label>
            <select
              [(ngModel)]="settings.theme"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </ng-template>
      <ng-template #modalFooter>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            (click)="settingsModal.close()"
            class="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            (click)="saveSettings()"
            class="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Save Settings
          </button>
        </div>
      </ng-template>
    </ngx-custom-modal>
  `,
})
export class ProgrammaticDemoComponent implements OnInit, OnDestroy {
  @ViewChild('confirmModal') confirmModal!: NgxCustomModalComponent;
  @ViewChild('userFormModal') userFormModal!: NgxCustomModalComponent;
  @ViewChild('settingsModal') settingsModal!: NgxCustomModalComponent;

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', Validators.required],
  });

  settings = {
    notifications: true,
    autoSave: false,
    theme: 'light',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log('ProgrammaticDemoComponent initialized');
  }

  ngOnDestroy() {
    // Clean up any subscriptions or resources
  }

  showConfirmation() {
    this.confirmModal.open();
  }

  showUserForm() {
    this.userForm.reset({ role: 'user' });
    this.userFormModal.open();
  }

  showSettings() {
    this.settingsModal.open();
  }

  handleDelete() {
    console.log('Item deleted!');
    this.confirmModal.close();
    // Here you would typically call a service to delete the item
  }

  handleUserSubmit() {
    if (this.userForm.valid) {
      console.log('User created:', this.userForm.value);
      this.userFormModal.close();
      // Here you would typically call a service to create the user
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }

  saveSettings() {
    console.log('Settings saved:', this.settings);
    this.settingsModal.close();
    // Here you would typically call a service to save the settings
  }
}
