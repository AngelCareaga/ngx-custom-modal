// projects/example/src/app/services/style-toggle.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type StyleMode = 'custom' | 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class StyleToggleService {
  private currentStyleSubject = new BehaviorSubject<StyleMode>('custom');
  public currentStyle$ = this.currentStyleSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeStyle();
    }
  }

  toggleStyle(): void {
    const currentStyle = this.currentStyleSubject.value;
    const newStyle: StyleMode = currentStyle === 'custom' ? 'bootstrap' : 'custom';
    this.setStyle(newStyle);
  }

  setStyle(style: StyleMode): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.body.classList.remove('custom-demo-mode', 'bootstrap-demo-mode');
    document.body.classList.add(`${style}-demo-mode`);

    localStorage.setItem('demo-style-mode', style);
    this.currentStyleSubject.next(style);
  }

  getCurrentStyle(): StyleMode {
    return this.currentStyleSubject.value;
  }

  private initializeStyle(): void {
    const savedStyle = localStorage.getItem('demo-style-mode') as StyleMode;
    const defaultStyle: StyleMode = savedStyle || 'custom';
    this.setStyle(defaultStyle);
  }
}
