# ngx-custom-modal

<div align="center">

[![npm Version](https://img.shields.io/npm/v/ngx-custom-modal.svg)](https://www.npmjs.com/package/ngx-custom-modal)
[![Build Status](https://github.com/AngelCareaga/ngx-custom-modal/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/AngelCareaga/ngx-custom-modal/actions)
[![GitHub Stars](https://img.shields.io/github/stars/AngelCareaga/ngx-custom-modal?style=social)](https://github.com/AngelCareaga/ngx-custom-modal/stargazers)
[![Angular](https://img.shields.io/badge/Angular-17--20-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**A lightweight Angular modal component with full standalone support**

[Live Examples](https://angelcareaga.github.io/ngx-custom-modal/) • [Documentation](https://github.com/AngelCareaga/ngx-custom-modal#readme) • [Report Bug](https://github.com/AngelCareaga/ngx-custom-modal/issues)

</div>

## ✨ Features

- 🎯 **Angular Native** - Built specifically for Angular 17-20
- 🎭 **Standalone Components** - No NgModule required
- 🔗 **Nested Modals** - Full support for modal stacking
- 🎨 **Bootstrap Compatible** - Works seamlessly with Bootstrap 3 & 4
- 📱 **Mobile Friendly** - Touch-optimized for mobile devices
- ⚡ **Lightweight** - Minimal bundle impact
- 🔧 **TypeScript** - Full type safety and IntelliSense
- 🎪 **Custom Content** - Support for components and HTML templates
- 🎛️ **Configurable** - Extensive customization options

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

## 📋 Examples

### Component Inside Modal

```typescript
@Component({
  template: `
    <button (click)="componentModal.open()">Open Component Modal</button>

    <ngx-custom-modal #componentModal>
      <ng-template #modalHeader>
        <h2>Component Modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <app-my-component></app-my-component>
      </ng-template>
      <ng-template #modalFooter>
        <button (click)="componentModal.close()" class="btn btn-secondary">Close</button>
      </ng-template>
    </ngx-custom-modal>
  `,
})
export class ComponentModalExample {}
```

### Nested Modals

```typescript
@Component({
  template: `
    <ngx-custom-modal #parentModal>
      <ng-template #modalHeader>
        <h2>Parent Modal</h2>
      </ng-template>
      <ng-template #modalBody>
        <p>This is the parent modal.</p>
        <button (click)="childModal.open()">Open Child Modal</button>

        <ngx-custom-modal #childModal>
          <ng-template #modalBody>
            <p>This is the nested child modal!</p>
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
  };
}
```

## 🔧 API Reference

### Component Properties

| Property              | Type           | Default | Description                          |
| --------------------- | -------------- | ------- | ------------------------------------ |
| `closeOnOutsideClick` | `boolean`      | `true`  | Close modal when clicking outside    |
| `closeOnEscape`       | `boolean`      | `true`  | Close modal when pressing Escape key |
| `customClass`         | `string`       | `''`    | Custom CSS class for the modal       |
| `hideCloseButton`     | `boolean`      | `false` | Hide the default close button        |
| `options`             | `ModalOptions` | `{}`    | Configuration options object         |

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
| `isTopMost()` | `boolean` | Checks if modal is topmost |

### ModalOptions Interface

```typescript
interface ModalOptions {
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  customClass?: string;
  hideCloseButton?: boolean;
}
```

## 🎨 Styling

### Default Styles

The library comes with minimal default styles. For a complete styling solution, you can use the provided CSS:

```css
/* Basic modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 42;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease-in;
}

.modal.in {
  opacity: 1;
}

.modal-content {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px solid #eee;
}

.modal-body {
  padding: 20px 0;
}

.modal-footer {
  padding-top: 14px;
  border-top: 1px solid #eee;
}

.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Bootstrap Integration

For Bootstrap users, ngx-custom-modal works out of the box with Bootstrap CSS classes:

```html
<!-- No additional CSS needed with Bootstrap -->
<ngx-custom-modal #bootstrapModal>
  <ng-template #modalHeader>
    <h4 class="modal-title">Bootstrap Modal</h4>
  </ng-template>
  <ng-template #modalBody>
    <p>This modal uses Bootstrap styles automatically!</p>
  </ng-template>
  <ng-template #modalFooter>
    <button type="button" class="btn btn-secondary" (click)="bootstrapModal.close()">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
  </ng-template>
</ngx-custom-modal>
```

### Dark Mode Support

```css
/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .modal {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal-content {
    background-color: #1f2937;
    color: #f9fafb;
    border: 1px solid #374151;
  }

  .modal-header,
  .modal-footer {
    border-color: #374151;
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

## 📈 Changelog

### 18.0.2

- Updated to Angular 18
- Added standalone component support
- Improved TypeScript definitions
- Enhanced accessibility features

### 17.0.1

- Initial Angular 17 support
- Standalone components by default
- Bootstrap 4 compatibility
- Nested modal support

---

<div align="center">

**Made with ❤️ by [Angel Careaga](https://angelcareaga.com)**

[⭐ Star this repo](https://github.com/AngelCareaga/ngx-custom-modal/stargazers) if you found it helpful!

</div>
