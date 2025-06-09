// projects/example/src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroComponent, ExamplesComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <app-header></app-header>
      <app-hero></app-hero>
      <app-examples></app-examples>
      <app-footer></app-footer>
    </div>
  `,
})
export class AppComponent {}
