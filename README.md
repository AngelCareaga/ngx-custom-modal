# ngx-custom-modal

[![npm Version](https://img.shields.io/npm/v/ngx-custom-modal.svg)](https://www.npmjs.com/package/ngx-custom-modal)
[![Build Status](https://travis-ci.org/AngelCareaga/ngx-custom-modal.svg?branch=master)](https://travis-ci.org/AngelCareaga/ngx-custom-modal)

> A custom Modal / Dialog (with inner component support) for Angular 17+ projects.

It is an update, continuation and improvement of the modal concept [Angular Custom Modal](https://github.com/zurfyx/angular-custom-modal).

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
...
})
```

### Raw HTML

app.component.html

```
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

```
@Component({
  selector: 'app-my-component',
  templateUrl: 'my-component.component.html',
})
export class AppModalContentComponent { }
```

my-component.component.html

```
<p>My component's HTML</p>
```

app.component.html

```
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

```
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

