export interface APIProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
  example?: string;
  required?: boolean;
}

export interface APIMethod {
  name: string;
  parameters?: string;
  returns: string;
  description: string;
  example?: string;
}

export interface APIEvent {
  name: string;
  payload?: string;
  description: string;
  example?: string;
}

export const API_PROPERTIES: APIProperty[] = [
  {
    name: 'closeOnOutsideClick',
    type: 'boolean',
    default: 'true',
    description: 'Controls whether the modal closes when clicking outside the modal content area.',
    example: '[closeOnOutsideClick]="false"',
    required: false,
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    default: 'true',
    description: 'Controls whether the modal closes when the Escape key is pressed.',
    example: '[closeOnEscape]="false"',
    required: false,
  },
  {
    name: 'customClass',
    type: 'string',
    default: "''",
    description: 'Custom CSS class to be applied to the modal container for styling.',
    example: 'customClass="my-modal-theme"',
    required: false,
  },
  {
    name: 'hideCloseButton',
    type: 'boolean',
    default: 'false',
    description: 'Hides the default close button (×) in the modal header.',
    example: '[hideCloseButton]="true"',
    required: false,
  },
  {
    name: 'options',
    type: 'ModalOptions',
    default: '{}',
    description: 'Configuration object that can override individual properties.',
    example: '[options]="{ closeOnOutsideClick: false }"',
    required: false,
  },
];

export const API_TEMPLATE_REFS: APIProperty[] = [
  {
    name: '#modalHeader',
    type: 'TemplateRef<any>',
    description: 'Template reference for the modal header content.',
    example: '<ng-template #modalHeader><h2>Title</h2></ng-template>',
    required: false,
  },
  {
    name: '#modalBody',
    type: 'TemplateRef<any>',
    description: 'Template reference for the modal body content.',
    example: '<ng-template #modalBody><p>Content</p></ng-template>',
    required: true,
  },
  {
    name: '#modalFooter',
    type: 'TemplateRef<any>',
    description: 'Template reference for the modal footer content.',
    example: '<ng-template #modalFooter><button>OK</button></ng-template>',
    required: false,
  },
];

export const API_METHODS: APIMethod[] = [
  {
    name: 'open',
    returns: 'void',
    description: 'Opens the modal and displays it to the user with fade-in animation.',
    example: 'this.modal.open()',
  },
  {
    name: 'close',
    returns: 'void',
    description: 'Closes the modal and hides it from the user with fade-out animation.',
    example: 'this.modal.close()',
  },
  {
    name: 'isTopMost',
    returns: 'boolean',
    description: 'Returns true if this modal is the topmost modal in the stack (useful for nested modals).',
    example: 'if (this.modal.isTopMost()) { /* handle top modal */ }',
  },
];

export const API_EVENTS: APIEvent[] = [
  {
    name: 'modalOpened',
    payload: 'void',
    description: 'Emitted when the modal is opened and the open animation completes.',
    example: '(modalOpened)="onModalOpened()"',
  },
  {
    name: 'modalClosed',
    payload: 'void',
    description: 'Emitted when the modal is closed and the close animation completes.',
    example: '(modalClosed)="onModalClosed()"',
  },
];

export const MODAL_OPTIONS_INTERFACE = `interface ModalOptions {
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  customClass?: string;
  hideCloseButton?: boolean;
}`;

export const USAGE_EXAMPLES = {
  basic: `<ngx-custom-modal #modal>
  <ng-template #modalHeader>
    <h2>Modal Title</h2>
  </ng-template>
  <ng-template #modalBody>
    <p>Modal content goes here</p>
  </ng-template>
</ngx-custom-modal>`,

  withOptions: `<ngx-custom-modal
  #modal
  [closeOnOutsideClick]="false"
  [closeOnEscape]="true"
  customClass="my-custom-modal">
  <!-- templates here -->
</ngx-custom-modal>`,

  withComponent: `<ngx-custom-modal #modal>
  <ng-template #modalBody>
    <app-my-component
      [data]="componentData"
      (save)="onSave($event)">
    </app-my-component>
  </ng-template>
</ngx-custom-modal>`,
};
