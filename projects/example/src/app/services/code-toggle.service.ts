// projects/example/src/app/services/code-toggle.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeToggleService {
  private codeShown: Set<string> = new Set();

  toggle(codeId: string): void {
    if (this.codeShown.has(codeId)) {
      this.codeShown.delete(codeId);
    } else {
      this.codeShown.add(codeId);
    }
  }

  isShown(codeId: string): boolean {
    return this.codeShown.has(codeId);
  }
}
