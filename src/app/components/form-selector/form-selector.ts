import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-selector',
  templateUrl: './form-selector.html',
  styleUrl: './form-selector.scss',
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
    }
  ];
}