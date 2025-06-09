import { CodeExample } from './examples.config';

export const BOOTSTRAP_EXAMPLES: CodeExample[] = [
  {
    id: 'bootstrap-setup',
    title: 'Bootstrap Setup',
    description: 'How to set up Bootstrap with ngx-custom-modal',
    language: 'json',
    code: `// angular.json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}

// Or install via npm
npm install bootstrap

// Then import in styles.css
@import '~bootstrap/dist/css/bootstrap.min.css';`,
    difficulty: 'beginner',
  },
  {
    id: 'bootstrap-modal',
    title: 'Bootstrap Modal Example',
    description: 'Complete Bootstrap modal with form components',
    language: 'typescript',
    code: `@Component({
  selector: 'app-bootstrap-modal',
  template: \`
    <button class="btn btn-primary" (click)="bootstrapModal.open()">
      Open Bootstrap Modal
    </button>

    <ngx-custom-modal #bootstrapModal>
      <ng-template #modalHeader>
        <h4 class="modal-title">User Registration</h4>
      </ng-template>

      <ng-template #modalBody>
        <!-- Alert Messages -->
        <div *ngIf="showSuccess" class="alert alert-success alert-dismissible fade show">
          <strong>Success!</strong> Registration completed.
          <button type="button" class="btn-close" (click)="showSuccess = false"></button>
        </div>

        <div *ngIf="showError" class="alert alert-danger alert-dismissible fade show">
          <strong>Error!</strong> Please check your input.
          <button type="button" class="btn-close" (click)="showError = false"></button>
        </div>

        <!-- Form -->
        <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name *</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  formControlName="firstName"
                  [class.is-invalid]="isFieldInvalid('firstName')">
                <div class="invalid-feedback">
                  First name is required
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name *</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  formControlName="lastName"
                  [class.is-invalid]="isFieldInvalid('lastName')">
                <div class="invalid-feedback">
                  Last name is required
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email address *</label>
            <input
              type="email"
              class="form-control"
              id="email"
              formControlName="email"
              [class.is-invalid]="isFieldInvalid('email')">
            <div class="invalid-feedback">
              Valid email is required
            </div>
            <div class="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password *</label>
            <input
              type="password"
              class="form-control"
              id="password"
              formControlName="password"
              [class.is-invalid]="isFieldInvalid('password')">
            <div class="invalid-feedback">
              Password must be at least 8 characters
            </div>
          </div>

          <div class="mb-3">
            <label for="country" class="form-label">Country</label>
            <select class="form-select" id="country" formControlName="country">
              <option value="">Choose...</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="mx">Mexico</option>
              <option value="uk">United Kingdom</option>
            </select>
          </div>

          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="terms"
              formControlName="acceptTerms"
              [class.is-invalid]="isFieldInvalid('acceptTerms')">
            <label class="form-check-label" for="terms">
              I agree to the <a href="#" class="link-primary">Terms and Conditions</a>
            </label>
            <div class="invalid-feedback">
              You must accept the terms and conditions
            </div>
          </div>

          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="newsletter"
              formControlName="newsletter">
            <label class="form-check-label" for="newsletter">
              Subscribe to our newsletter
            </label>
          </div>
        </form>
      </ng-template>

      <ng-template #modalFooter>
        <button
          type="button"
          class="btn btn-secondary"
          (click)="bootstrapModal.close()">
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          (click)="onSubmit()"
          [disabled]="registrationForm.invalid || isSubmitting">
          <span *ngIf="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
          {{ isSubmitting ? 'Registering...' : 'Register' }}
        </button>
      </ng-template>
    </ngx-custom-modal>
  \`
})
export class BootstrapModalExample {
  showSuccess = false;
  showError = false;
  isSubmitting = false;

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    country: [''],
    acceptTerms: [false, Validators.requiredTrue],
    newsletter: [false]
  });

  constructor(private fb: FormBuilder) {}

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      this.showError = false;

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        this.showSuccess = true;
        this.registrationForm.reset();

        // Close modal after success message
        setTimeout(() => {
          this.bootstrapModal.close();
          this.showSuccess = false;
        }, 2000);

      } catch (error) {
        this.showError = true;
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registrationForm.controls).forEach(key => {
        this.registrationForm.get(key)?.markAsTouched();
      });
    }
  }
}`,
    difficulty: 'intermediate',
  },
];
