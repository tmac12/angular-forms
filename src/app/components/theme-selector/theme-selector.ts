import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class ThemeSelector {
  private themeService = inject(ThemeService);

  protected readonly availableThemes = this.themeService.availableThemes;
  protected readonly currentTheme = this.themeService.currentTheme;

  protected selectTheme(themeId: string): void {
    this.themeService.setTheme(themeId);
  }

  protected toggleDropdown(): void {
    // This will be handled by CSS hover states
  }

  protected getThemePreviewClass(themeId: string, colorType: 'primary' | 'secondary' | 'accent'): string {
    const theme = this.availableThemes().find(t => t.id === themeId);
    if (!theme) return '';
    
    switch (colorType) {
      case 'primary':
        return `bg-${theme.colors.primary}`;
      case 'secondary':
        return `bg-${theme.colors.secondary}`;
      case 'accent':
        return `bg-${theme.colors.accent}`;
      default:
        return '';
    }
  }
}