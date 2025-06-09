# ngx-custom-modal

<div align="center">

[![npm Version](https://img.shields.io/npm/v/ngx-custom-modal.svg)](https://www.npmjs.com/package/ngx-custom-modal)
[![Build Status](https://github.com/AngelCareaga/ngx-custom-modal/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/AngelCareaga/ngx-custom-modal/actions)
[![GitHub Stars](https://img.shields.io/github/stars/AngelCareaga/ngx-custom-modal?style=social)](https://github.com/AngelCareaga/ngx-custom-modal/stargazers)
[![Angular](https://img.shields.io/badge/Angular-17+-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**A lightweight Angular modal component with signal-based reactivity and full standalone support**

[Live Examples](https://angelcareaga.github.io/ngx-custom-modal/) • [Documentation](https://github.com/AngelCareaga/ngx-custom-modal#readme) • [Report Bug](https://github.com/AngelCareaga/ngx-custom-modal/issues)

</div>

## ✨ Features

- 🎯 **Angular Native** - Built specifically for Angular 17+
- 🎭 **Standalone Components** - No NgModule required
- 🚀 **Signal-Based Reactivity** - Optimized performance with Angular signals
- 🔗 **Advanced Modal Stacking** - Intelligent z-index management and focus trapping
- 🎨 **Bootstrap 3, 4 & 5 Compatible** - Seamless integration with all Bootstrap versions
- 📱 **Mobile Friendly** - Touch-optimized for mobile devices
- ⚡ **Lightweight** - Minimal bundle impact with performance optimization
- 🔧 **TypeScript** - Full type safety and IntelliSense
- 🎪 **Custom Content** - Support for components and HTML templates
- 🎛️ **Configurable** - Extensive customization options
- ♿ **WCAG Compliant** - Full accessibility support with screen reader compatibility

## 🚀 Quick Start

### Installation

```bash
npm install ngx-custom-modal
# or
yarn add ngx-custom-modal
# or
pnpm add ngx-custom-modal
```

### Basic Usage

```typescript
import { NgxCustomModalComponent } from 'ngx-custom-modal';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NgxCustomModalComponent],
  template: `
    <button (click)="modal.open()">Open Modal</button>

    <ngx-custom-modal #modal>
      <ng-template #modalHeader>
        <h2>Modal Title</h2>
      </ng-template>
      <ng-template #modalBody>
        <p>Modal content goes here!</p>
      </ng-template>
    </ngx-custom-modal>
  `,
})
export class ExampleComponent {}
```

### Usage with Angular 17 Features

```typescript
import { Component, signal } from '@angular/core';
import { NgxCustomModalComponent, ModalOptions } from 'ngx-custom-modal';

@Component({
  selector: 'app-signal-example',
  standalone: true,
  imports: [NgxCustomModalComponent],
  template: `
    <button (click)="modal.open()">Open Signal Modal</button>

    <ngx-custom-modal
      #modal
      [size]="modalSize()"
      [options]="modalOptions()"
      (opened)="onModalOpened()"
      (closed)="onModalClosed()"
    >
      <ng-template #modalHeader>
        <h2>{{ modalTitle() }}</h2>
      </ng-template>

      <ng-template #modalBody>
        @if (showContent()) {
          <p>{{ modalContent() }}</p>
          @for (item of items(); track item.id) {
            <div class="item">{{ item.name }}</div>
          }
        }
      </ng-template>
    </ngx-custom-modal>
  `,
})
export class SignalExampleComponent {
  modalTitle = signal('Signal-Based Modal');
  modalContent = signal('This modal uses Angular 17 features!');
  modalSize = signal<'sm' | 'md' | 'lg' | 'xl'>('lg');
  showContent = signal(true);

  items = signal([
    { id: 1, name: 'Signal-based reactivity' },
    { id: 2, name: 'Control flow syntax' },
    { id: 3, name: 'Performance optimization' },
  ]);

  modalOptions = signal<ModalOptions>({
    closeOnOutsideClick: true,
    closeOnEscape: true,
    animation: true,
    centered: true,
  });

  onModalOpened() {
    console.log('Modal opened with signals!');
  }

  onModalClosed() {
    console.log('Modal closed');
  }
}
```

## 📋 Examples

### Component Inside Modal

```typescript
@Component({
  template: `
    <button (click)="componentModal.open()">Open Component Modal</button>

    <ngx-custom-modal #componentModal [size]="'lg'">
      <ng-template #modalHeader>
        <h2>Component Modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <app-my-component [data]="componentData"></app-my-component>
      </ng-template>
      <ng-template #modalFooter>
        <button (click)="componentModal.close()" class="btn btn-secondary">Close</button>
      </ng-template>
    </ngx-custom-modal>
  `,
})
export class ComponentModalExample {
  componentData = { message: 'Hello from component!' };
}
```

### Nested Modals

```typescript
@Component({
  template: `
    <ngx-custom-modal #parentModal [size]="'xl'">
      <ng-template #modalHeader>
        <h2>Parent Modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <p>This is the parent modal with automatic stack management.</p>
        <button (click)="childModal.open()">Open Child Modal</button>

        <ngx-custom-modal #childModal [size]="'md'" [centered]="true">
          <ng-template #modalHeader>
            <h3>Child Modal</h3>
          </ng-template>
          <ng-template #modalBody>
            <p>This is a nested modal with proper z-index handling!</p>
          </ng-template>
        </ngx-custom-modal>
      </ng-template>
    </ngx-custom-modal>
  `,
})
export class NestedModalExample {}
```

### Custom Configuration

```typescript
@Component({
  template: `
    <ngx-custom-modal
      #customModal
      [closeOnOutsideClick]="false"
      [closeOnEscape]="false"
      [hideCloseButton]="true"
      [size]="'lg'"
      [centered]="true"
      [scrollable]="true"
      [animation]="true"
      customClass="my-custom-modal"
    >
      <ng-template #modalHeader>
        <h2>Custom Modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <p>This modal has custom configuration!</p>
        <button (click)="customModal.close()">Manual Close</button>
      </ng-template>
    </ngx-custom-modal>
  `,
})
export class CustomModalExample {}
```

### Using Options Object

```typescript
@Component({
  template: `
    <ngx-custom-modal #optionsModal [options]="modalOptions">
      <ng-template #modalHeader>
        <h2>Options Modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <p>Configured via options object</p>
      </ng-template>
    </ngx-custom-modal>
  `,
})
export class OptionsModalExample {
  modalOptions: ModalOptions = {
    closeOnOutsideClick: false,
    closeOnEscape: true,
    customClass: 'my-modal-class',
    hideCloseButton: false,
    size: 'lg',
    centered: true,
    scrollable: false,
    animation: true,
    animationDuration: 300,
    backdrop: 'dynamic',
    keyboard: true,
    focus: true,
  };
}
```

## 🔧 API Reference

### Component Properties

| Property              | Type           | Default    | Description                          |
| --------------------- | -------------- | ---------- | ------------------------------------ | ----------------- | ------ | ---------- |
| `closeOnOutsideClick` | `boolean`      | `true`     | Close modal when clicking outside    |
| `closeOnEscape`       | `boolean`      | `true`     | Close modal when pressing Escape key |
| `customClass`         | `string`       | `''`       | Custom CSS class for the modal       |
| `hideCloseButton`     | `boolean`      | `false`    | Hide the default close button        |
| `options`             | `ModalOptions` | `{}`       | Configuration options object         |
| `size`                | `'sm'          | 'md'       | 'lg'                                 | 'xl'`             | `'md'` | Modal size |
| `centered`            | `boolean`      | `false`    | Center modal vertically              |
| `scrollable`          | `boolean`      | `false`    | Make modal body scrollable           |
| `animation`           | `boolean`      | `true`     | Enable/disable animations            |
| `backdrop`            | `'static'      | 'dynamic'` | `'dynamic'`                          | Backdrop behavior |
| `keyboard`            | `boolean`      | `true`     | Enable keyboard interactions         |
| `focus`               | `boolean`      | `true`     | Enable focus management              |

### Events

| Event     | Type                 | Description                        |
| --------- | -------------------- | ---------------------------------- |
| `opening` | `EventEmitter<void>` | Emitted when modal starts opening  |
| `opened`  | `EventEmitter<void>` | Emitted when modal is fully opened |
| `closing` | `EventEmitter<void>` | Emitted when modal starts closing  |
| `closed`  | `EventEmitter<void>` | Emitted when modal is fully closed |

### Template References

| Template Ref   | Type          | Description             |
| -------------- | ------------- | ----------------------- |
| `#modalHeader` | `TemplateRef` | Header content template |
| `#modalBody`   | `TemplateRef` | Body content template   |
| `#modalFooter` | `TemplateRef` | Footer content template |

### Methods

| Method        | Returns   | Description                |
| ------------- | --------- | -------------------------- |
| `open()`      | `void`    | Opens the modal            |
| `close()`     | `void`    | Closes the modal           |
| `toggle()`    | `void`    | Toggles modal visibility   |
| `isTopMost()` | `boolean` | Checks if modal is topmost |

### ModalOptions Interface

```typescript
interface ModalOptions {
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  customClass?: string;
  hideCloseButton?: boolean;
  backdrop?: 'static' | 'dynamic';
  keyboard?: boolean;
  focus?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  scrollable?: boolean;
  animation?: boolean;
  animationDuration?: number;
}
```

## 🎨 Styling

### Default Styles

The library comes with modern CSS custom properties for easy theming:

```css
:root {
  /* Modal backdrop */
  --modal-backdrop-bg: rgba(0, 0, 0, 0.5);
  --modal-backdrop-blur: 2px;

  /* Modal content */
  --modal-content-bg: #fff;
  --modal-content-border: 1px solid rgba(0, 0, 0, 0.125);
  --modal-content-border-radius: 0.5rem;
  --modal-content-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

  /* Animations */
  --modal-animation-duration: 200ms;
  --modal-z-index: 1050;
}

/* Basic modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: var(--modal-backdrop-bg);
  z-index: var(--modal-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--modal-animation-duration) ease-in-out;
  backdrop-filter: blur(var(--modal-backdrop-blur));
}

.modal.in {
  opacity: 1;
}

.modal-content {
  background-color: var(--modal-content-bg);
  border: var(--modal-content-border);
  border-radius: var(--modal-content-border-radius);
  box-shadow: var(--modal-content-shadow);
  max-width: 500px;
  width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
}

.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.5;
  transition: opacity 0.15s ease-in-out;
}

.close:hover {
  opacity: 0.75;
}
```

### Bootstrap Integration

For Bootstrap users, ngx-custom-modal works seamlessly with all Bootstrap versions:

```html
<!-- Bootstrap Modal Example -->
<ngx-custom-modal #bootstrapModal [size]="'lg'" [centered]="true">
  <ng-template #modalHeader>
    <h1 class="modal-title fs-5">Bootstrap Modal</h1>
  </ng-template>
  <ng-template #modalBody>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <p class="text-muted">Left column content</p>
        </div>
        <div class="col-md-6">
          <p class="text-muted">Right column content</p>
        </div>
      </div>
    </div>
  </ng-template>
  <ng-template #modalFooter>
    <button type="button" class="btn btn-secondary" (click)="bootstrapModal.close()">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
  </ng-template>
</ngx-custom-modal>
```

### Dark Mode Support

```css
/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --modal-backdrop-bg: rgba(0, 0, 0, 0.8);
    --modal-content-bg: #1f2937;
    --modal-content-border: 1px solid #374151;
    --modal-text-color: #f9fafb;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  :root {
    --modal-animation-duration: 0ms;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --modal-content-border: 2px solid currentColor;
    --modal-backdrop-bg: rgba(0, 0, 0, 0.9);
  }
}
```

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Angular CLI 17+

### Setup

```bash
git clone https://github.com/AngelCareaga/ngx-custom-modal.git
cd ngx-custom-modal
npm install
```

### Development Server

```bash
npm start
```

### Build Library

```bash
npm run build:lib
```

### Run Tests

```bash
npm test
```

### Code Formatting

This project uses [Prettier](https://prettier.io/) for code formatting:

```bash
npm run format
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation for any API changes
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[angular-custom-modal](https://github.com/zurfyx/angular-custom-modal)** - Created by Gerard Rovira Sánchez, which served as inspiration for this project
- **[Stephen Paul](https://stackoverflow.com/users/1087131/stephen-paul)** - For the initial Angular 2 Modal concept
- **Angular Team** - For the amazing framework

## 📞 Support

- 📧 Email: [dev.angelcareaga@gmail.com](mailto:dev.angelcareaga@gmail.com)
- 🐛 Issues: [GitHub Issues](https://github.com/AngelCareaga/ngx-custom-modal/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/AngelCareaga/ngx-custom-modal/discussions)
- 🌐 Website: [angelcareaga.com](https://angelcareaga.com)

---

<div align="center">

**Made with ❤️ by [Angel Careaga](https://angelcareaga.com)**

[⭐ Star this repo](https://github.com/AngelCareaga/ngx-custom-modal/stargazers) if you found it helpful!

</div>
