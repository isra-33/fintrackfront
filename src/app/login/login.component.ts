import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AgentsService } from '../services/agents.service'; // Import your AgentsService
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
  agents: any[] = []; // To store agents data from backend

  constructor(private router: Router, private agentsService: AgentsService) {}

  ngOnInit(): void {
    this.getAgents(); // Fetch all agents
  }

  // Fetch agents from the backend
  getAgents(): void {
    this.agentsService.getAllAgents().subscribe(
      (data) => {
        this.agents = data;
      },
      (error) => {
        console.error('Error fetching agents:', error);
        this.error = true;
        this.openModal();
      }
    );
  }

  onSignIn(): void {
    // Find the agent from the fetched agents array
    const agent = this.agents.find(
      (agent) => agent.agentEmail === this.email && agent.password === this.password
    );

    if (agent) {
      // Store the agent's role in sessionStorage
      sessionStorage.setItem('role', agent.role);

      // Navigate to the home page after successful login
      this.router.navigate(['/home']);
    } else {
      // Show error if login fails
      this.error = true;
      this.openModal();
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
