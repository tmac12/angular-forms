import { Injectable, signal, computed } from '@angular/core';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themes: Theme[] = [
    {
      id: 'default',
      name: 'Default',
      description: 'Classic indigo and purple theme',
      colors: {
        primary: 'indigo-600',
        secondary: 'purple-600',
        accent: 'pink-500',
        background: 'slate-50',
        surface: 'white',
        text: 'gray-900',
        textSecondary: 'gray-600',
        border: 'gray-200',
        error: 'red-500',
        success: 'green-500',
        warning: 'yellow-500'
      },
      gradients: {
        primary: 'from-indigo-500 via-purple-500 to-pink-500',
        secondary: 'from-indigo-50 via-white to-purple-50',
        accent: 'from-indigo-600 to-purple-600',
        background: 'from-slate-50 to-blue-50'
      }
    },
    {
      id: 'modern-dark',
      name: 'Modern Dark',
      description: 'Sleek dark theme with cyan accents',
      colors: {
        primary: 'cyan-500',
        secondary: 'blue-500',
        accent: 'emerald-400',
        background: 'slate-900',
        surface: 'slate-800',
        text: 'slate-100',
        textSecondary: 'slate-300',
        border: 'slate-700',
        error: 'red-400',
        success: 'emerald-400',
        warning: 'amber-400'
      },
      gradients: {
        primary: 'from-cyan-500 via-blue-500 to-indigo-500',
        secondary: 'from-slate-900 via-slate-800 to-slate-900',
        accent: 'from-cyan-600 to-blue-600',
        background: 'from-slate-900 to-slate-800'
      }
    },
    {
      id: 'warm-sunset',
      name: 'Warm Sunset',
      description: 'Warm orange and red theme',
      colors: {
        primary: 'orange-500',
        secondary: 'red-500',
        accent: 'yellow-500',
        background: 'orange-50',
        surface: 'white',
        text: 'gray-900',
        textSecondary: 'gray-700',
        border: 'orange-200',
        error: 'red-600',
        success: 'green-600',
        warning: 'amber-600'
      },
      gradients: {
        primary: 'from-orange-500 via-red-500 to-pink-500',
        secondary: 'from-orange-50 via-white to-red-50',
        accent: 'from-orange-600 to-red-600',
        background: 'from-orange-50 to-red-50'
      }
    },
    {
      id: 'cool-ocean',
      name: 'Cool Ocean',
      description: 'Refreshing blue-green ocean theme',
      colors: {
        primary: 'blue-500',
        secondary: 'teal-500',
        accent: 'cyan-400',
        background: 'blue-50',
        surface: 'white',
        text: 'slate-900',
        textSecondary: 'slate-600',
        border: 'blue-200',
        error: 'red-500',
        success: 'teal-500',
        warning: 'amber-500'
      },
      gradients: {
        primary: 'from-blue-500 via-teal-500 to-cyan-500',
        secondary: 'from-blue-50 via-white to-teal-50',
        accent: 'from-blue-600 to-teal-600',
        background: 'from-blue-50 to-teal-50'
      }
    }
  ];

  private currentThemeId = signal<string>('default');
  
  public readonly availableThemes = computed(() => this.themes);
  
  public readonly currentTheme = computed(() => {
    const themeId = this.currentThemeId();
    return this.themes.find(theme => theme.id === themeId) || this.themes[0];
  });

  setTheme(themeId: string): void {
    const theme = this.themes.find(t => t.id === themeId);
    if (theme) {
      this.currentThemeId.set(themeId);
      localStorage.setItem('selectedTheme', themeId);
    }
  }

  initializeTheme(): void {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && this.themes.find(t => t.id === savedTheme)) {
      this.currentThemeId.set(savedTheme);
    }
  }

  // Helper methods to get theme-specific classes
  getBackgroundClass(): string {
    return `bg-gradient-to-br ${this.currentTheme().gradients.background}`;
  }

  getCardClass(): string {
    const theme = this.currentTheme();
    const surfaceClass = theme.id === 'modern-dark' ? `bg-${theme.colors.surface}` : `bg-${theme.colors.surface}/80 backdrop-blur-sm`;
    return `${surfaceClass} rounded-3xl shadow-xl border border-${theme.colors.border} p-8`;
  }

  getPrimaryButtonClass(): string {
    return `bg-gradient-to-r ${this.currentTheme().gradients.accent} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200`;
  }

  getInputClass(): string {
    const theme = this.currentTheme();
    const bgClass = theme.id === 'modern-dark' ? `bg-${theme.colors.surface}` : 'bg-gray-50 focus:bg-white';
    return `form-field w-full px-4 py-3 border-2 border-${theme.colors.border} rounded-xl text-base focus:border-${theme.colors.primary} focus:ring-2 focus:ring-${theme.colors.primary}/20 transition-all duration-200 ${bgClass} text-${theme.colors.text}`;
  }

  getTextClass(type: 'primary' | 'secondary' = 'primary'): string {
    const theme = this.currentTheme();
    return type === 'primary' ? `text-${theme.colors.text}` : `text-${theme.colors.textSecondary}`;
  }
}