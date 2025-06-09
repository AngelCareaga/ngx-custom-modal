import { CodeExample } from './examples.config';

export const ADVANCED_EXAMPLES: CodeExample[] = [
  {
    id: 'programmatic-control',
    title: 'Programmatic Modal Control',
    description: 'Service-based modal management with global control',
    language: 'typescript',
    code: `// modal.service.ts
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals = new Map<string, NgxCustomModalComponent>();
  private modalStack: string[] = [];

  // Observable for modal state changes
  private modalStateSubject = new BehaviorSubject<{
    id: string;
    action: 'opened' | 'closed';
    modal?: NgxCustomModalComponent;
  } | null>(null);

  public modalState$ = this.modalStateSubject.asObservable();

  register(id: string, modal: NgxCustomModalComponent) {
    this.modals.set(id, modal);
    console.log(\`Modal '\${id}' registered\`);
  }

  unregister(id: string) {
    this.modals.delete(id);
    this.modalStack = this.modalStack.filter(modalId => modalId !== id);
  }

  open(id: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const modal = this.modals.get(id);
      if (!modal) {
        reject(new Error(\`Modal with id '\${id}' not found\`));
        return;
      }

      modal.open();
      this.modalStack.push(id);

      this.modalStateSubject.next({
        id,
        action: 'opened',
        modal
      });

      // Store resolve function for later use
      (modal as any)._resolve = resolve;
      if (data) {
        (modal as any)._data = data;
      }
    });
  }

  close(id: string, result?: any) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.close();
      this.modalStack = this.modalStack.filter(modalId => modalId !== id);

      this.modalStateSubject.next({
        id,
        action: 'closed',
        modal
      });

      // Resolve promise if exists
      if ((modal as any)._resolve) {
        (modal as any)._resolve(result);
        delete (modal as any)._resolve;
      }

      // Clean up data
      if ((modal as any)._data) {
        delete (modal as any)._data;
      }
    }
  }

  closeAll() {
    [...this.modalStack].reverse().forEach(id => this.close(id));
  }

  getTopModal(): NgxCustomModalComponent | null {
    const topId = this.modalStack[this.modalStack.length - 1];
    return topId ? this.modals.get(topId) || null : null;
  }

  isOpen(id: string): boolean {
    return this.modalStack.includes(id);
  }

  getModalCount(): number {
    return this.modalStack.length;
  }

  // Utility method to create confirmation modals
  async confirm(
    title: string,
    message: string,
    options?: {
      confirmText?: string;
      cancelText?: string;
      variant?: 'danger' | 'warning' | 'info';
    }
  ): Promise<boolean> {
    return this.open('confirm-modal', {
      title,
      message,
      ...options
    });
  }
}

// Component using the service
@Component({
  selector: 'app-programmatic-demo',
  template: \`
    <div class="row g-3">
      <div class="col-md-4">
        <button (click)="showConfirm()" class="btn btn-danger w-100">
          Delete Item
        </button>
      </div>
      <div class="col-md-4">
        <button (click)="showUserForm()" class="btn btn-primary w-100">
          Add User
        </button>
      </div>
      <div class="col-md-4">
        <button (click)="showSettings()" class="btn btn-secondary w-100">
          Settings
        </button>
      </div>
    </div>

    <div class="mt-3">
      <small class="text-muted">
        Open modals: {{ modalService.getModalCount() }}
      </small>
    </div>

    <!-- Confirmation Modal -->
    <ngx-custom-modal #confirmModal [closeOnOutsideClick]="false">
      <ng-template #modalHeader>
        <h4 [class]="confirmData?.variant ? 'text-' + confirmData.variant : ''">
          {{ confirmData?.title || 'Confirm' }}
        </h4>
      </ng-template>
      <ng-template #modalBody>
        <p>{{ confirmData?.message }}</p>
      </ng-template>
      <ng-template #modalFooter>
        <button (click)="handleConfirm(false)" class="btn btn-secondary">
          {{ confirmData?.cancelText || 'Cancel' }}
        </button>
        <button
          (click)="handleConfirm(true)"
          [class]="'btn btn-' + (confirmData?.variant || 'primary')">
          {{ confirmData?.confirmText || 'Confirm' }}
        </button>
      </ng-template>
    </ngx-custom-modal>

    <!-- User Form Modal -->
    <ngx-custom-modal #userFormModal>
      <ng-template #modalHeader>
        <h4>Add New User</h4>
      </ng-template>
      <ng-template #modalBody>
        <form [formGroup]="userForm">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" formControlName="name">
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" formControlName="email">
          </div>
          <div class="mb-3">
            <label class="form-label">Role</label>
            <select class="form-select" formControlName="role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
        </form>
      </ng-template>
      <ng-template #modalFooter>
        <button (click)="handleUserForm(false)" class="btn btn-secondary">
          Cancel
        </button>
        <button
          (click)="handleUserForm(true)"
          [disabled]="userForm.invalid"
          class="btn btn-primary">
          Add User
        </button>
      </ng-template>
    </ngx-custom-modal>
  \`
})
export class ProgrammaticDemoComponent implements OnInit, OnDestroy {
  @ViewChild('confirmModal') confirmModal!: NgxCustomModalComponent;
  @ViewChild('userFormModal') userFormModal!: NgxCustomModalComponent;

  confirmData: any = null;

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', Validators.required]
  });

  constructor(
    public modalService: ModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Register modals
    this.modalService.register('confirm-modal', this.confirmModal);
    this.modalService.register('user-form-modal', this.userFormModal);

    // Listen to modal state changes
    this.modalService.modalState$.subscribe(state => {
      if (state) {
        console.log(\`Modal \${state.id} was \${state.action}\`);
      }
    });
  }

  ngOnDestroy() {
    this.modalService.unregister('confirm-modal');
    this.modalService.unregister('user-form-modal');
  }

  async showConfirm() {
    try {
      const result = await this.modalService.confirm(
        'Delete Item',
        'Are you sure you want to delete this item? This action cannot be undone.',
        {
          confirmText: 'Delete',
          cancelText: 'Keep',
          variant: 'danger'
        }
      );

      if (result) {
        console.log('Item deleted!');
        // Perform delete action
      }
    } catch (error) {
      console.log('Confirmation cancelled');
    }
  }

  async showUserForm() {
    try {
      this.userForm.reset({ role: 'user' });
      const result = await this.modalService.open('user-form-modal');

      if (result) {
        console.log('User added:', result);
        // Handle user creation
      }
    } catch (error) {
      console.log('User form cancelled');
    }
  }

  showSettings() {
    // Example of opening multiple modals
    this.modalService.open('user-form-modal').then(() => {
      return this.modalService.confirm(
        'Save Settings',
        'Do you want to save the changes?'
      );
    }).then(saveResult => {
      if (saveResult) {
        console.log('Settings saved!');
      }
    });
  }

  handleConfirm(confirmed: boolean) {
    this.modalService.close('confirm-modal', confirmed);
  }

  handleUserForm(save: boolean) {
    if (save && this.userForm.valid) {
      this.modalService.close('user-form-modal', this.userForm.value);
    } else {
      this.modalService.close('user-form-modal', null);
    }
  }
}`,
    difficulty: 'advanced',
  },
  {
    id: 'dynamic-modals',
    title: 'Dynamic Modal Components',
    description: 'Create and load modal components dynamically at runtime',
    language: 'typescript',
    code: `// dynamic-modal.service.ts
@Injectable({
  providedIn: 'root'
})
export class DynamicModalService {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  async createModal<T>(
    component: Type<T>,
    config?: {
      inputs?: Partial<T>;
      modalOptions?: ModalOptions;
      data?: any;
    }
  ): Promise<ComponentRef<T>> {

    // Create wrapper component dynamically
    const wrapperComponent = this.createWrapperComponent(component, config);

    // Create component factory
    const factory = this.componentFactoryResolver.resolveComponentFactory(wrapperComponent);

    // Create component instance
    const componentRef = this.viewContainerRef.createComponent(
      factory,
      undefined,
      this.injector
    );

    // Set inputs if provided
    if (config?.inputs) {
      Object.assign(componentRef.instance, config.inputs);
    }

    // Detect changes
    componentRef.changeDetectorRef.detectChanges();

    return componentRef;
  }

  private createWrapperComponent<T>(
    component: Type<T>,
    config?: any
  ): Type<any> {

    @Component({
      template: \`
        <ngx-custom-modal
          #dynamicModal
          [options]="modalOptions"
          (modalClosed)="onModalClosed()">

          <ng-template #modalHeader *ngIf="hasHeader">
            <ng-container
              *ngComponentOutlet="component;
                               injector: componentInjector;
                               content: headerContent">
            </ng-container>
          </ng-template>

          <ng-template #modalBody>
            <ng-container
              *ngComponentOutlet="component;
                               injector: componentInjector">
            </ng-container>
          </ng-template>

          <ng-template #modalFooter *ngIf="hasFooter">
            <ng-container
              *ngComponentOutlet="component;
                               injector: componentInjector;
                               content: footerContent">
            </ng-container>
          </ng-template>
        </ngx-custom-modal>
      \`,
      standalone: true,
      imports: [NgxCustomModalComponent, NgComponentOutlet]
    })
    class DynamicModalWrapper implements OnInit, OnDestroy {
      @ViewChild('dynamicModal') modal!: NgxCustomModalComponent;

      component = component;
      modalOptions = config?.modalOptions || {};
      componentInjector!: Injector;

      hasHeader = false;
      hasFooter = false;
      headerContent: any[][] = [];
      footerContent: any[][] = [];

      constructor(private injector: Injector) {
        // Create custom injector with data
        this.componentInjector = Injector.create({
          providers: [
            {
              provide: 'MODAL_DATA',
              useValue: config?.data || {}
            },
            {
              provide: 'MODAL_REF',
              useValue: {
                close: (result?: any) => this.close(result),
                dismiss: () => this.dismiss()
              }
            }
          ],
          parent: this.injector
        });
      }

      ngOnInit() {
        this.checkComponentInterfaces();
        this.modal.open();
      }

      ngOnDestroy() {
        this.modal.close();
      }

      private checkComponentInterfaces() {
        // Check if component implements modal interfaces
        const instance = new component(this.componentInjector);

        this.hasHeader = 'renderHeader' in instance;
        this.hasFooter = 'renderFooter' in instance;
      }

      close(result?: any) {
        this.modal.close();
        // Emit result to parent
      }

      dismiss() {
        this.modal.close();
      }

      onModalClosed() {
        // Clean up component
      }
    }

    return DynamicModalWrapper;
  }
}

// Modal interfaces
export interface ModalHeader {
  renderHeader(): void;
}

export interface ModalFooter {
  renderFooter(): void;
}

export interface ModalRef {
  close(result?: any): void;
  dismiss(): void;
}

// Example dynamic component
@Component({
  selector: 'app-user-details',
  template: \`
    <div class="user-details">
      <div class="text-center mb-4">
        <img [src]="user.avatar"
             class="rounded-circle"
             width="80" height="80"
             [alt]="user.name">
        <h4 class="mt-2">{{ user.name }}</h4>
        <span class="badge bg-primary">{{ user.role }}</span>
      </div>

      <dl class="row">
        <dt class="col-sm-4">Email:</dt>
        <dd class="col-sm-8">{{ user.email }}</dd>

        <dt class="col-sm-4">Department:</dt>
        <dd class="col-sm-8">{{ user.department }}</dd>

        <dt class="col-sm-4">Joined:</dt>
        <dd class="col-sm-8">{{ user.joinDate | date }}</dd>

        <dt class="col-sm-4">Status:</dt>
        <dd class="col-sm-8">
          <span [class]="'badge bg-' + (user.active ? 'success' : 'secondary')">
            {{ user.active ? 'Active' : 'Inactive' }}
          </span>
        </dd>
      </dl>

      <div class="mt-4 d-flex gap-2 justify-content-end">
        <button (click)="edit()" class="btn btn-outline-primary">
          Edit User
        </button>
        <button (click)="close()" class="btn btn-secondary">
          Close
        </button>
      </div>
    </div>
  \`,
  standalone: true,
  imports: [CommonModule]
})
export class UserDetailsComponent implements OnInit {
  user: any = {};

  constructor(
    @Inject('MODAL_DATA') private data: any,
    @Inject('MODAL_REF') private modalRef: ModalRef
  ) {
    this.user = data.user || {};
  }

  ngOnInit() {
    console.log('User details modal opened for:', this.user);
  }

  edit() {
    this.modalRef.close({ action: 'edit', user: this.user });
  }

  close() {
    this.modalRef.close();
  }
}

// Usage example
@Component({
  template: \`
    <button (click)="showUserDetails()" class="btn btn-info">
      Show User Details
    </button>
  \`
})
export class DynamicModalExample {
  constructor(private dynamicModalService: DynamicModalService) {}

  async showUserDetails() {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Developer',
      department: 'Engineering',
      joinDate: new Date('2022-01-15'),
      active: true,
      avatar: 'https://via.placeholder.com/80'
    };

    try {
      const modalRef = await this.dynamicModalService.createModal(
        UserDetailsComponent,
        {
          data: { user },
          modalOptions: {
            closeOnOutsideClick: false,
            customClass: 'user-details-modal'
          }
        }
      );

      // Listen for modal result
      modalRef.instance.result?.subscribe(result => {
        if (result?.action === 'edit') {
          console.log('Edit user:', result.user);
          // Open edit modal
        }
      });

    } catch (error) {
      console.error('Error creating modal:', error);
    }
  }
}`,
    difficulty: 'advanced',
  },
];
