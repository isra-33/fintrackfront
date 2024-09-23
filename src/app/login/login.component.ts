import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Use AuthService instead of AgentsService
import { ErrorPopupComponent } from '../error-popup/error-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [RouterModule, FormsModule, ErrorPopupComponent]
})
export class LoginComponent {
  public isModalOpen = false;
  email: string = '';
  password: string = '';
  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSignIn(): void {
    this.authService.login(this.email, this.password).subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        // Navigate to the home page after successful login
        this.router.navigate(['/home']);
      } else {
        // Show error if login fails
        this.error = true;
        this.openModal();
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
