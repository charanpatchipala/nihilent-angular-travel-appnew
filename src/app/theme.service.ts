// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkTheme: boolean = false;

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;

    document.documentElement.style.setProperty(
      '--background-color',
      this.isDarkTheme ? '#333' : '#fff'
    );
    document.documentElement.style.setProperty(
      '--text-color',
      this.isDarkTheme ? '#fff' : '#333'
    );
  }
}
//   private isDarkTheme = false;

//   toggleTheme() {
//     this.isDarkTheme = !this.isDarkTheme;
//     document.body.classList.toggle('dark-theme', this.isDarkTheme);
//   }

//   isDarkThemeEnabled() {
//     return this.isDarkTheme;
//   }
// }
