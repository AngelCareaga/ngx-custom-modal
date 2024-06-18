# ngx-custom-modal

[![npm Version (latest)](https://img.shields.io/npm/v/ngx-custom-modal.svg)](https://www.npmjs.com/package/ngx-custom-modal)
[![Build Status (main)](https://app.travis-ci.com/AngelCareaga/ngx-custom-modal.svg?branch=main)](https://app.travis-ci.com/github/AngelCareaga/ngx-custom-modal?branch=main)

[![npm Version (angular-17)](https://img.shields.io/npm/v/ngx-custom-modal/17.0.0.svg)](https://www.npmjs.com/package/ngx-custom-modal/v/17.0.0)
[![Build Status (angular-17)](https://app.travis-ci.com/AngelCareaga/ngx-custom-modal.svg?branch=angular-17)](https://app.travis-ci.com/github/AngelCareaga/ngx-custom-modal?branch=angular-17)


> A custom Modal / Dialog (with inner component support).

It is an update, continuation and improvement of the modal concept [Angular Custom Modal](https://github.com/zurfyx/angular-custom-modal).

## Angular compatibility

| ngx-custom-modal | @angular |
|------------------|----------|
| 18.0.0           | ≥18.0.0  |
| 17.0.0           | ≥17.0.0  |

## Demo

For a live demonstration, visit [ngx-custom-modal demo](https://AngelCareaga.github.io/ngx-custom-modal/).

## Install

```bash
npm install ngx-custom-modal
```

## Features

### Core Features with Angular 17 Standalone Components:

- **Light**: No additional CSS/JS frameworks attached.
- **[Bootstrap 3 & 4 CSS Compatible](#bootstrap)**: Ensures seamless integration with these versions of Bootstrap.
- **Custom Modal Components**:
  - Customizable modal headers, bodies, and footers for tailored UI design.
- **[Modal Stacking Support](#nested-modal)**: Allows multiple modals to be opened and managed effectively.
- **Lazy Inner Component Initialization**: Components within modals are initialized only as needed.
- **Efficient Lifecycle Management**: Inner components are destroyed (`ngOnDestroy`) when the modal is closed, ensuring resource efficiency.

Minor:

- Optional CSS animations
- Optional parent scrolling when modal is visible
- Escape or button to close modal

## Usage

```
imports: [
  ...
  NgxCustomModalComponent,
  ...
],
```

### Raw HTML

app.component.html

```html
<button (click)="htmlInsideModal.open()">Raw HTML inside modal</button>
<ngx-custom-modal #htmlInsideModal>
  <ng-template #modalHeader><h2>HTML inside modal</h2></ng-template>
  <ng-template #modalBody>
    <p>HTML content inside modal</p>
  </ng-template>
</ngx-custom-modal>
```

### Component inside Modal

my-component.component.ts

```html
@Component({
selector: 'app-my-component',
templateUrl: 'my-component.component.html',
})
export class AppModalContentComponent { }
```

my-component.component.html

```html
<p>My component's HTML</p>
```

app.component.html

```html
<button (click)="componentInsideModal.open()">Component inside modal</button>
<ngx-custom-modal #componentInsideModal>
  <ng-template #modalHeader><h2>Component inside modal</h2></ng-template>
  <ng-template #modalBody>
    <app-my-component></app-my-component>
  </ng-template>
  <ng-template #modalFooter></ng-template>
</ngx-custom-modal>
```

### Nested Modal

app.component.html

```html
<ngx-custom-modal #nestedModal>
  <ng-template #modalHeader><h2>Nested modal</h2></ng-template>
  <ng-template #modalBody>
    Nested modals can be created by simply adding a &lt;modal&gt; inside a &lt;modal&gt;
    ...
    <button (click)="nestedModalX.open()">Open nested modal</button>
    <ngx-custom-modal #nestedModalX>
      <ng-template #modalBody>This is the nested modal content.</ng-template>
    </ngx-custom-modal>
  </ng-template>
</ngx-custom-modal>
```

## Custom Classes and Options

You can now apply custom CSS classes, use an `options` object for flexible configuration, and hide the close button.

### Custom CSS Classes

To apply custom CSS classes to the modal:

```html
<ngx-custom-modal #customClassModal customClass="my-custom-class">
  <ng-template #modalHeader><h2>Custom Class Modal</h2></ng-template>
  <ng-template #modalBody>
    <p>This modal has a custom CSS class.</p>
  </ng-template>
</ngx-custom-modal>
```

See [example source code](https://github.com/AngelCareaga/ngx-custom-modal/tree/main/projects/example) for more information.

## Development Guidelines

### Code Formatting

This project uses [Prettier](https://prettier.io/) for code formatting. To ensure consistent code style, please format your code using Prettier before submitting any changes.

To format the codebase, run the following command:

```bash
npm run format
```

This command will automatically format all files in the project according to the predefined Prettier configuration.

**Why ng-template?**

ng-template prevents the parent component from initializing the component. Only when the modal library finds it convenient the component will be initialize and visible to the user. Hence, it preserves the natural `ngOnInit()` and `ngOnDestroy()` that we expect.

Similar libraries which make use of `<ng-content>` and its [content transclution strategy](https://scotch.io/tutorials/angular-2-transclusion-using-ng-content#toc-multi-slot-transclusion), do not prevent the component from initializing, but rather just hide it. The component was already initialized in the parent component.

References:<br>
https://angular.io/api/common/NgTemplateOutlet<br>
https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/<br>
https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b<br>
https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e<br>

## Styles

The library carries the minimum generic styles. Beautifying it is up to you.

### Default styles

You can find the demo copy-paste styles in [modal.css](https://github.com/AngelCareaga/ngx-custom-modal/blob/main/projects/example/src/assets/modal.css).

### Bootstrap

Bootstrap users require no additional CSS other than the Bootstrap library (either version 3 or 4).

## API

### ModalComponent

| Name                | Type                                           | Description                                                                                  |
|---------------------| ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| header              | @ContentChild('modalHeader'): TemplateRef<any> | Angular Template (`<ng-template>`) to use as header.                                         |
| body                | @ContentChild('modalBody'): TemplateRef<any>   | Angular Template (`ng-template`) to use as body.                                             |
| footer              | @ContentChild('modalFooter'): TemplateRef<any> | Angular Template (`ng-template`) to use as footer.                                           |
| closeOnOutsideClick | @Input(): boolean = true                       | When set to `true` modal will close when a click is performed outside the modal container.   |
| closeOnEscape       | @Input(): boolean = true                       | When set to `true` modal will close when the `ESC` key is pressed.                           |
| customClass         | @Input(): string                               | Custom class to be added to the modal container.                                             |
| hideCloseButton     | @Input(): boolean = false                      | When set to `true` the close button will be hidden.                                          |
| options             | @Input(): ModalOptions                         | Options to customize the modal.                                                              |
| open                | () => void                                     | Opens the modal.                                                                             |
| close               | () => void                                     | Closes the modal.                                                                            |
| isTopMost           | () => boolean                                  | Returns true is the modal is the top most modal, or false if it is underneath another modal. |

## Special Thanks

This project, ngx-custom-modal, was inspired by and built upon the foundational work of [angular-custom-modal](https://github.com/zurfyx/angular-custom-modal), created by Gerard Rovira Sánchez. A special acknowledgment to [Stephen Paul](https://stackoverflow.com/users/1087131/stephen-paul) for his [initial Angular 2 Modal version](https://stackoverflow.com/a/40144809/2013580), which laid the groundwork for these modal dialog implementations in Angular.

## License

MIT © Angel Careaga
