import { Component, ChangeDetectionStrategy, inject, signal, HostListener } from '@angular/core';
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
  protected readonly isDropdownOpen = signal(false);

  protected selectTheme(themeId: string): void {
    this.themeService.setTheme(themeId);
    this.isDropdownOpen.set(false); // Close dropdown after selection
  }

  protected toggleDropdown(): void {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const themeSelector = target.closest('app-theme-selector');
    
    if (!themeSelector && this.isDropdownOpen()) {
      this.isDropdownOpen.set(false);
    }
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