import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, JsonPipe]
})
export class TemplateDrivenForm {
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

  protected userData: UserData = {
    firstName: '',
    lastName: '',
    email: '',
    age: null,
    country: '',
    agreeToTerms: false
  };

  protected formData: UserData | null = null;
  protected submitAttempted = false;

  protected onSubmit(form: any): void {
    this.submitAttempted = true;
    
    if (form.valid) {
      this.formData = { ...this.userData };
      console.log('Template-driven form submitted:', this.userData);
    } else {
      console.log('Form is invalid');
    }
  }

  protected onReset(form: any): void {
    this.userData = {
      firstName: '',
      lastName: '',
      email: '',
      age: null,
      country: '',
      agreeToTerms: false
    };
    form.resetForm();
    this.submitAttempted = false;
    this.formData = null;
  }

  // Validation error methods for template-driven forms
  protected getFieldError(field: any, fieldName: string): string {
    if (!field?.errors || !this.submitAttempted) return '';
    
    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        if (field.errors['required']) return `${fieldName === 'firstName' ? 'First' : 'Last'} name is required`;
        if (field.errors['minlength']) return `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        break;
      
      case 'email':
        if (field.errors['required']) return 'Email is required';
        if (field.errors['email']) return 'Please enter a valid email address';
        break;
      
      case 'age':
        if (field.errors['required']) return 'Age is required';
        if (field.errors['min']) return 'You must be at least 18 years old';
        if (field.errors['max']) return 'Age cannot exceed 120 years';
        break;
      
      case 'country':
        if (field.errors['required']) return 'Please select a country';
        break;
      
      case 'agreeToTerms':
        if (field.errors['required']) return 'You must agree to the terms and conditions';
        break;
    }
    
    return '';
  }
}