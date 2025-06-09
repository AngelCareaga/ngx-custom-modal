import { Injectable, VERSION } from '@angular/core';

export interface AfterRenderCallback {
  (): void;
}

export interface AfterRenderOptions {
  phase?: any;
  injector?: any;
}

/**
 * Service to handle lifecycle hook compatibility across Angular versions.
 * Manages the breaking change from afterRender to afterEveryRender in Angular 20.
 */
@Injectable({
  providedIn: 'root',
})
export class LifecycleCompatibilityService {
  private readonly majorVersion = parseInt(VERSION.major);
  private readonly minorVersion = parseInt(VERSION.minor);

  /**
   * Ejecuta un callback después de cada render (compatible entre versiones).
   */
  public afterEveryRender(callback: AfterRenderCallback, options?: AfterRenderOptions): (() => void) | null {
    try {
      // Intentar usar la función apropiada según la versión
      if (this.majorVersion >= 20) {
        // Para Angular 20+, intentar afterEveryRender
        const afterEveryRender = (globalThis as any)?.ng?.core?.afterEveryRender;
        if (afterEveryRender) {
          return afterEveryRender(callback, options);
        }
      } else if (this.majorVersion >= 17 || (this.majorVersion === 16 && this.minorVersion >= 2)) {
        // Para Angular 16.2-19, intentar afterRender
        const afterRender = (globalThis as any)?.ng?.core?.afterRender;
        if (afterRender) {
          return afterRender(callback, options);
        }
      }
    } catch (error) {
      console.warn('Error executing lifecycle hook:', error);
    }

    // Fallback usando requestAnimationFrame o setTimeout
    this.fallbackAfterRender(callback);
    return null;
  }

  /**
   * Ejecuta un callback después del siguiente render.
   */
  public afterNextRender(callback: AfterRenderCallback, options?: AfterRenderOptions): (() => void) | null {
    try {
      const afterNextRender = (globalThis as any)?.ng?.core?.afterNextRender;
      if (afterNextRender) {
        return afterNextRender(callback, options);
      }
    } catch (error) {
      console.warn('Error executing afterNextRender hook:', error);
    }

    // Fallback usando requestAnimationFrame o setTimeout
    this.fallbackAfterNextRender(callback);
    return null;
  }

  /**
   * Implementación de fallback para afterRender.
   */
  private fallbackAfterRender(callback: AfterRenderCallback): void {
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        try {
          callback();
        } catch (error) {
          console.warn('Error in fallback afterRender callback:', error);
        }
      });
    } else {
      setTimeout(() => {
        try {
          callback();
        } catch (error) {
          console.warn('Error in fallback afterRender callback:', error);
        }
      }, 0);
    }
  }

  /**
   * Implementación de fallback para afterNextRender.
   */
  private fallbackAfterNextRender(callback: AfterRenderCallback): void {
    this.fallbackAfterRender(callback);
  }

  /**
   * Retorna información sobre la versión actual.
   */
  public getVersionInfo(): {
    major: number;
    minor: number;
    patch: string;
    hasAfterRender: boolean;
    hasAfterNextRender: boolean;
    hookName: string;
  } {
    return {
      major: this.majorVersion,
      minor: this.minorVersion,
      patch: VERSION.patch,
      hasAfterRender: true, // Siempre disponible mediante fallback
      hasAfterNextRender: true, // Siempre disponible mediante fallback
      hookName: this.majorVersion >= 20 ? 'afterEveryRender' : 'afterRender',
    };
  }
}
