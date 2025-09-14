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
    },
    {
      id: 'neubrutalism',
      name: 'Neubrutalism',
      description: 'Bold, modern design with sharp contrasts',
      colors: {
        primary: 'black',
        secondary: 'yellow-400',
        accent: 'fuchsia-500',
        background: 'white',
        surface: 'white',
        text: 'black',
        textSecondary: 'gray-700',
        border: 'black',
        error: 'red-600',
        success: 'green-600',
        warning: 'orange-500'
      },
      gradients: {
        primary: 'from-black via-gray-800 to-black',
        secondary: 'from-yellow-400 via-yellow-300 to-yellow-400',
        accent: 'from-fuchsia-500 via-pink-500 to-purple-500',
        background: 'from-white via-gray-50 to-white'
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
    let surfaceClass = theme.id === 'modern-dark' ? `bg-${theme.colors.surface}` : `bg-${theme.colors.surface}/80 backdrop-blur-sm`;
    let borderClass = `border border-${theme.colors.border}`;
    let shadowClass = 'shadow-xl';
    let roundedClass = 'rounded-3xl';
    
    // Neubrutalism specific styling
    if (theme.id === 'neubrutalism') {
      surfaceClass = `bg-${theme.colors.surface}`;
      borderClass = `border-4 border-${theme.colors.border}`;
      shadowClass = 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]';
      roundedClass = 'rounded-none';
    }
    
    return `${surfaceClass} ${roundedClass} ${shadowClass} ${borderClass} p-8`;
  }

  getPrimaryButtonClass(): string {
    const theme = this.currentTheme();
    let baseClass = `bg-gradient-to-r ${theme.gradients.accent} text-white font-semibold`;
    let roundedClass = 'rounded-xl';
    let shadowClass = 'shadow-lg hover:shadow-xl';
    let hoverClass = 'transform hover:-translate-y-0.5';
    
    // Neubrutalism specific styling
    if (theme.id === 'neubrutalism') {
      baseClass = `bg-${theme.colors.secondary} text-${theme.colors.text} font-black border-4 border-${theme.colors.border}`;
      roundedClass = 'rounded-none';
      shadowClass = 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      hoverClass = 'transform hover:-translate-x-1 hover:-translate-y-1';
    }
    
    return `${baseClass} ${roundedClass} ${shadowClass} ${hoverClass} transition-all duration-200`;
  }

  getInputClass(): string {
    const theme = this.currentTheme();
    let bgClass = theme.id === 'modern-dark' ? `bg-${theme.colors.surface}` : 'bg-gray-50 focus:bg-white';
    let borderClass = `border-2 border-${theme.colors.border}`;
    let roundedClass = 'rounded-xl';
    let focusClass = `focus:border-${theme.colors.primary} focus:ring-2 focus:ring-${theme.colors.primary}/20`;
    
    // Neubrutalism specific styling
    if (theme.id === 'neubrutalism') {
      bgClass = `bg-${theme.colors.surface}`;
      borderClass = `border-4 border-${theme.colors.border}`;
      roundedClass = 'rounded-none';
      focusClass = `focus:border-${theme.colors.accent} focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`;
    }
    
    return `form-field w-full px-4 py-3 ${borderClass} ${roundedClass} text-base ${focusClass} transition-all duration-200 ${bgClass} text-${theme.colors.text}`;
  }

  getTextClass(type: 'primary' | 'secondary' = 'primary'): string {
    const theme = this.currentTheme();
    return type === 'primary' ? `text-${theme.colors.text}` : `text-${theme.colors.textSecondary}`;
  }
}