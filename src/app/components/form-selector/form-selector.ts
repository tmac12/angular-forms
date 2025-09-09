import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-form-selector',
  templateUrl: './form-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class FormSelector {
  private themeService = inject(ThemeService);
  
  protected readonly currentTheme = this.themeService.currentTheme;
  protected readonly formOptions = [
    {
      title: 'Reactive Forms with Signals',
      description: 'Modern Angular forms using FormControl/FormGroup with signal-based state management',
      route: '/reactive-signals',
      color: 'primary'
    },
    {
      title: 'Reactive Forms (Classic)',
      description: 'Traditional reactive forms using FormControl/FormGroup without signals',
      route: '/reactive-classic',
      color: 'secondary'
    },
    {
      title: 'Template-Driven Forms',
      description: 'Two-way data binding forms using ngModel and template reference variables',
      route: '/template-driven',
      color: 'accent'
    },
    {
      title: 'Template-Driven with Signals',
      description: 'Template-driven forms enhanced with signals for reactive state management',
      route: '/template-driven-signals',
      color: 'special'
    }
  ];

  protected getCardClasses(color: string): string {
    const baseClasses = 'relative overflow-hidden rounded-2xl shadow-lg';
    const theme = this.currentTheme();
    
    switch (color) {
      case 'primary':
        return `${baseClasses} bg-gradient-to-br ${theme.gradients.primary}`;
      case 'secondary':
        return `${baseClasses} bg-gradient-to-br ${theme.gradients.secondary}`;
      case 'accent':
        return `${baseClasses} bg-gradient-to-br ${theme.gradients.accent}`;
      case 'special':
        return `${baseClasses} bg-gradient-to-br from-${theme.colors.accent} via-${theme.colors.secondary} to-${theme.colors.primary}`;
      default:
        return `${baseClasses} bg-gradient-to-br from-gray-500 to-gray-700`;
    }
  }
}