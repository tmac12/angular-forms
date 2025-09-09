import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-selector',
  templateUrl: './form-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class FormSelector {
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
    
    switch (color) {
      case 'primary':
        return `${baseClasses} bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500`;
      case 'secondary':
        return `${baseClasses} bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500`;
      case 'accent':
        return `${baseClasses} bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500`;
      case 'special':
        return `${baseClasses} bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500`;
      default:
        return `${baseClasses} bg-gradient-to-br from-gray-500 to-gray-700`;
    }
  }
}