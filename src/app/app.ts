import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSelector } from './components/theme-selector/theme-selector';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSelector],
  templateUrl: './app.html',
  styles: '',
})
export class App implements OnInit {
  private themeService = inject(ThemeService);
  protected readonly title = signal('angular-forms');

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }
}
