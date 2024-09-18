import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  constructor() {}

  logout(): void {
    sessionStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
