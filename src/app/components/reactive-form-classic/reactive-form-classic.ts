import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

interface UserForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number | null>;
  country: FormControl<string>;
  agreeToTerms: FormControl<boolean>;
}

@Component({
  selector: 'app-reactive-form-classic',
  templateUrl: './reactive-form-classic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, JsonPipe]
})
export class ReactiveFormClassic {
  protected readonly themeService = inject(ThemeService);
  protected readonly form = new FormGroup<UserForm>({
    firstName: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.minLength(2)] 
    }),
    lastName: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.minLength(2)] 
    }),
    email: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.email] 
    }),
    age: new FormControl<number | null>(null, [
      Validators.required, 
      Validators.min(18), 
      Validators.max(120)
    ]),
    country: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    agreeToTerms: new FormControl(false, { 
      nonNullable: true, 
      validators: [Validators.requiredTrue] 
    })
  });

  protected readonly countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Australia',
    'Japan',
    'South Korea'
  ];

  protected formData: any = null;
  protected submitAttempted = false;

  // Traditional validation error methods
  protected getFirstNameError(): string {
    const control = this.form.get('firstName');
    if (!control?.errors || !this.submitAttempted) return '';
    
    if (control.errors['required']) return 'First name is required';
    if (control.errors['minlength']) return 'First name must be at least 2 characters';
    return '';
  }

  protected getLastNameError(): string {
    const control = this.form.get('lastName');
    if (!control?.errors || !this.submitAttempted) return '';
    
    if (control.errors['required']) return 'Last name is required';
    if (control.errors['minlength']) return 'Last name must be at least 2 characters';
    return '';
  }

  protected getEmailError(): string {
    const control = this.form.get('email');
    if (!control?.errors || !this.submitAttempted) return '';
    
    if (control.errors['required']) return 'Email is required';
    if (control.errors['email']) return 'Please enter a valid email address';
    return '';
  }

  protected getAgeError(): string {
    const control = this.form.get('age');
    if (!control?.errors || !this.submitAttempted) return '';
    
    if (control.errors['required']) return 'Age is required';
    if (control.errors['min']) return 'You must be at least 18 years old';
    if (control.errors['max']) return 'Age cannot exceed 120 years';
    return '';
  }

  protected getCountryError(): string {
    const control = this.form.get('country');
    if (!control?.errors || !this.submitAttempted) return '';
    
    if (control.errors['required']) return 'Please select a country';
    return '';
  }

  protected getTermsError(): string {
    const control = this.form.get('agreeToTerms');
    if (!control?.errors || !this.submitAttempted) return '';
    
    if (control.errors['required']) return 'You must agree to the terms and conditions';
    return '';
  }

  protected onSubmit(): void {
    this.submitAttempted = true;
    
    if (this.form.valid) {
      this.formData = this.form.value;
      console.log('Form submitted (classic):', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  protected onReset(): void {
    this.form.reset();
    this.submitAttempted = false;
    this.formData = null;
  }

  // Getter for form validation state
  protected get isFormValid(): boolean {
    return this.form.valid;
  }
}