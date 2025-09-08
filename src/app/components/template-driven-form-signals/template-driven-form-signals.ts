import { Component, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age: number | null;
  country: string;
  agreeToTerms: boolean;
}

@Component({
  selector: 'app-template-driven-form-signals',
  templateUrl: './template-driven-form-signals.html',
  styleUrl: './template-driven-form-signals.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, JsonPipe]
})
export class TemplateDrivenFormSignals {
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

  // Signal-based form data
  protected readonly userData = signal<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    age: null,
    country: '',
    agreeToTerms: false
  });

  // Signal for form submission state
  protected readonly formData = signal<UserData | null>(null);
  protected readonly submitAttempted = signal(false);

  // Computed validation signals
  protected readonly isFirstNameValid = computed(() => {
    const firstName = this.userData().firstName;
    return firstName.length >= 2;
  });

  protected readonly isLastNameValid = computed(() => {
    const lastName = this.userData().lastName;
    return lastName.length >= 2;
  });

  protected readonly isEmailValid = computed(() => {
    const email = this.userData().email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  });

  protected readonly isAgeValid = computed(() => {
    const age = this.userData().age;
    return age !== null && age >= 18 && age <= 120;
  });

  protected readonly isCountryValid = computed(() => {
    return this.userData().country !== '';
  });

  protected readonly isTermsValid = computed(() => {
    return this.userData().agreeToTerms === true;
  });

  // Computed form validity
  protected readonly isFormValid = computed(() => {
    return this.isFirstNameValid() &&
           this.isLastNameValid() &&
           this.isEmailValid() &&
           this.isAgeValid() &&
           this.isCountryValid() &&
           this.isTermsValid();
  });

  // Computed error messages
  protected readonly firstNameError = computed(() => {
    if (!this.submitAttempted()) return '';
    const firstName = this.userData().firstName;
    if (firstName === '') return 'First name is required';
    if (firstName.length < 2) return 'First name must be at least 2 characters';
    return '';
  });

  protected readonly lastNameError = computed(() => {
    if (!this.submitAttempted()) return '';
    const lastName = this.userData().lastName;
    if (lastName === '') return 'Last name is required';
    if (lastName.length < 2) return 'Last name must be at least 2 characters';
    return '';
  });

  protected readonly emailError = computed(() => {
    if (!this.submitAttempted()) return '';
    const email = this.userData().email;
    if (email === '') return 'Email is required';
    if (!this.isEmailValid()) return 'Please enter a valid email address';
    return '';
  });

  protected readonly ageError = computed(() => {
    if (!this.submitAttempted()) return '';
    const age = this.userData().age;
    if (age === null || age === undefined) return 'Age is required';
    if (age < 18) return 'You must be at least 18 years old';
    if (age > 120) return 'Age cannot exceed 120 years';
    return '';
  });

  protected readonly countryError = computed(() => {
    if (!this.submitAttempted()) return '';
    if (this.userData().country === '') return 'Please select a country';
    return '';
  });

  protected readonly termsError = computed(() => {
    if (!this.submitAttempted()) return '';
    if (!this.userData().agreeToTerms) return 'You must agree to the terms and conditions';
    return '';
  });

  // Effect to log form state changes
  constructor() {
    effect(() => {
      const data = this.userData();
      console.log('Form data changed (signals):', data);
    });
  }

  // Update methods for template binding
  protected updateFirstName(value: string): void {
    this.userData.update(data => ({ ...data, firstName: value }));
  }

  protected updateLastName(value: string): void {
    this.userData.update(data => ({ ...data, lastName: value }));
  }

  protected updateEmail(value: string): void {
    this.userData.update(data => ({ ...data, email: value }));
  }

  protected updateAge(value: string): void {
    const age = value === '' ? null : parseInt(value, 10);
    this.userData.update(data => ({ ...data, age }));
  }

  protected updateCountry(value: string): void {
    this.userData.update(data => ({ ...data, country: value }));
  }

  protected updateTerms(value: boolean): void {
    this.userData.update(data => ({ ...data, agreeToTerms: value }));
  }

  protected onSubmit(form: any): void {
    this.submitAttempted.set(true);
    
    if (this.isFormValid()) {
      this.formData.set(this.userData());
      console.log('Template-driven form with signals submitted:', this.userData());
    } else {
      console.log('Form is invalid');
    }
  }

  protected onReset(form: any): void {
    this.userData.set({
      firstName: '',
      lastName: '',
      email: '',
      age: null,
      country: '',
      agreeToTerms: false
    });
    form.resetForm();
    this.submitAttempted.set(false);
    this.formData.set(null);
  }
}