// projects/example/src/app/components/header/header.component.ts
import { Component, OnInit, PLATFORM_ID, Inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StyleToggleService, StyleMode } from '../../services/style-toggle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header
      class="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
    >
      <div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <!-- Mobile Layout -->
        <div class="block lg:hidden">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div
                class="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m10 0H7m5-4v4m0 0v4"
                  ></path>
                </svg>
              </div>
              <div>
                <h1 class="text-base font-bold text-gray-900 dark:text-white">ngx-custom-modal</h1>
                <p class="text-xs text-gray-600 dark:text-gray-400">Angular Modal Component</p>
              </div>
            </div>

            <button
              (click)="toggleTheme()"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle theme"
            >
              @if (!isDarkMode()) {
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              } @else {
                <svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              }
            </button>
          </div>

          <!-- Mobile Style Toggle -->
          <div class="mb-3">
            <button
              (click)="toggleStyle()"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 transition-all duration-300"
              [class]="mobileStyleButtonClass()"
              [attr.aria-label]="
                'Switch to ' + (currentStyle() === 'custom' ? 'Bootstrap' : 'Custom') + ' documentation'
              "
            >
              <div class="flex items-center space-x-2.5">
                <div [class]="getStyleIconClass(currentStyle())">
                  @if (currentStyle() === 'custom') {
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                      ></path>
                    </svg>
                  } @else {
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20 0H4C1.8 0 0 1.8 0 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zM8.5 18.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13zm9 0c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13z"
                      />
                    </svg>
                  }
                </div>
                <div class="flex flex-col items-start">
                  <span class="text-sm font-semibold" [class]="styleLabelClass()">
                    @if (currentStyle() === 'custom') {
                      Custom Styles ⭐
                    } @else {
                      Bootstrap Guide
                    }
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    @if (currentStyle() === 'custom') {
                      Recommended
                    } @else {
                      Documentation
                    }
                  </span>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <div [class]="activeIndicatorClass()"></div>
              </div>
            </button>
          </div>

          <!-- Mobile Links -->
          <div class="flex flex-wrap items-center justify-center gap-2">
            <a
              href="https://github.com/AngelCareaga/ngx-custom-modal"
              target="_blank"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>

            <a href="https://www.npmjs.com/package/ngx-custom-modal" target="_blank">
              <img src="https://img.shields.io/npm/v/ngx-custom-modal.svg" alt="npm version" class="h-4" />
            </a>

            <span
              class="px-2 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-full text-xs font-medium"
            >
              MIT License
            </span>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden lg:flex justify-between items-center">
          <!-- Brand Section -->
          <div class="flex flex-col space-y-3">
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m10 0H7m5-4v4m0 0v4"
                  ></path>
                </svg>
              </div>

              <div class="flex flex-col">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">ngx-custom-modal</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">Angular Modal Component</p>
              </div>
            </div>

            <!-- Desktop Badges and Links -->
            <div class="flex flex-wrap items-center gap-3">
              <div class="flex items-center space-x-2">
                <a
                  href="https://github.com/AngelCareaga/ngx-custom-modal"
                  target="_blank"
                  class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>

                <a
                  href="https://github.com/AngelCareaga/ngx-custom-modal/stargazers"
                  target="_blank"
                  class="hover:-translate-y-0.5 transition-transform"
                >
                  <img
                    src="https://img.shields.io/github/stars/AngelCareaga/ngx-custom-modal?style=social"
                    alt="GitHub stars"
                  />
                </a>
              </div>

              <div class="flex items-center space-x-2">
                <a
                  href="https://www.npmjs.com/package/ngx-custom-modal"
                  target="_blank"
                  class="hover:-translate-y-0.5 transition-transform"
                >
                  <img src="https://img.shields.io/npm/v/ngx-custom-modal.svg" alt="npm version" class="h-5" />
                </a>

                <span
                  class="px-3 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-full text-xs font-medium"
                >
                  MIT License
                </span>

                <span
                  class="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium"
                >
                  Angular 17-20
                </span>
              </div>
            </div>
          </div>

          <!-- Desktop Actions Section -->
          <div class="flex items-center space-x-6">
            <!-- Desktop Documentation Mode Toggle -->
            <div class="flex flex-col space-y-2">
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">Documentation Mode</span>
              <button
                (click)="toggleStyle()"
                class="relative flex items-center justify-between w-52 px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:-translate-y-0.5"
                [class]="desktopStyleButtonClass()"
                [attr.aria-label]="
                  'Switch to ' + (currentStyle() === 'custom' ? 'Bootstrap' : 'Custom') + ' documentation'
                "
              >
                <!-- Style Icons -->
                <div class="flex items-center space-x-3">
                  <div [class]="getStyleIconClass('custom')">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                      ></path>
                    </svg>
                  </div>

                  <div [class]="getStyleIconClass('bootstrap')">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20 0H4C1.8 0 0 1.8 0 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zM8.5 18.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13zm9 0c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13z"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Active Style Label -->
                <div class="flex flex-col items-end">
                  <span class="text-sm font-semibold" [class]="styleLabelClass()">
                    @if (currentStyle() === 'custom') {
                      Custom ⭐
                    } @else {
                      Bootstrap
                    }
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    @if (currentStyle() === 'custom') {
                      Recommended
                    } @else {
                      Guide
                    }
                  </span>
                </div>

                <!-- Active Indicator -->
                <div class="absolute -right-1 -top-1">
                  <div [class]="activeIndicatorClass()"></div>
                  @if (currentStyle() === 'custom') {
                    <div [class]="activeIndicatorPulseClass()"></div>
                  }
                </div>
              </button>

              <p class="text-xs text-gray-500 dark:text-gray-400 max-w-52 text-center">
                {{ styleDescription() }}
              </p>
            </div>

            <!-- Author Info -->
            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>by</span>
              <a
                href="https://angelcareaga.com"
                target="_blank"
                class="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Angel Careaga
              </a>
            </div>

            <!-- Desktop Theme Toggle -->
            <div class="flex flex-col items-center space-y-2">
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Theme</span>
              <button
                (click)="toggleTheme()"
                class="relative p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:-translate-y-0.5 group"
                aria-label="Toggle theme"
              >
                @if (!isDarkMode()) {
                  <svg
                    class="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-all duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                } @else {
                  <svg
                    class="w-5 h-5 text-blue-400 group-hover:-rotate-12 transition-all duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                }

                <!-- Theme indicator dot -->
                <div class="absolute -top-1 -right-1">
                  <div [class]="themeIndicatorClass()"></div>
                </div>
              </button>

              <span class="text-xs text-gray-500 dark:text-gray-400">
                @if (isDarkMode()) {
                  Dark
                } @else {
                  Light
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  isDarkMode = signal(false);
  currentStyle = signal<StyleMode>('custom');

  mobileStyleButtonClass = computed(() => {
    const baseClasses =
      'w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 transition-all duration-300';
    return this.currentStyle() === 'custom'
      ? `${baseClasses} border-purple-500 bg-purple-50 dark:bg-purple-950`
      : `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-950`;
  });

  desktopStyleButtonClass = computed(() => {
    const baseClasses =
      'relative flex items-center justify-between w-52 px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:-translate-y-0.5';
    return this.currentStyle() === 'custom'
      ? `${baseClasses} border-purple-500 bg-purple-50 dark:bg-purple-950`
      : `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-950`;
  });

  styleLabelClass = computed(() => {
    return this.currentStyle() === 'custom'
      ? 'text-purple-700 dark:text-purple-300'
      : 'text-blue-700 dark:text-blue-300';
  });

  activeIndicatorClass = computed(() => {
    const baseClasses = 'w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 transition-all duration-300';
    return this.currentStyle() === 'custom'
      ? `${baseClasses} bg-purple-500 shadow-purple-200`
      : `${baseClasses} bg-blue-500 shadow-blue-200`;
  });

  activeIndicatorPulseClass = computed(() => {
    const baseClasses = 'absolute inset-0 w-3 h-3 rounded-full animate-ping transition-colors duration-300';
    return `${baseClasses} bg-purple-500`;
  });

  themeIndicatorClass = computed(() => {
    const baseClasses = 'w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 transition-all duration-300';
    return this.isDarkMode() ? `${baseClasses} bg-blue-400` : `${baseClasses} bg-yellow-400`;
  });

  styleDescription = computed(() => {
    return this.currentStyle() === 'custom'
      ? 'Modern design with Tailwind CSS integration'
      : 'Bootstrap code examples and documentation';
  });

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private styleToggleService: StyleToggleService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }

    this.styleToggleService.currentStyle$.subscribe(style => {
      this.currentStyle.set(style);
    });
  }

  toggleTheme() {
    this.isDarkMode.update(current => !current);
    this.updateTheme();

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    }
  }

  toggleStyle() {
    this.styleToggleService.toggleStyle();
  }

  getStyleIconClass(style: StyleMode): string {
    const baseClasses = 'flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200';

    if (style === 'custom') {
      return this.currentStyle() === 'custom'
        ? `${baseClasses} bg-purple-500`
        : `${baseClasses} bg-gray-300 dark:bg-gray-600`;
    } else {
      return this.currentStyle() === 'bootstrap'
        ? `${baseClasses} bg-blue-500`
        : `${baseClasses} bg-gray-300 dark:bg-gray-600`;
    }
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));
    this.updateTheme();
  }

  private updateTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      if (this.isDarkMode()) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }
}
