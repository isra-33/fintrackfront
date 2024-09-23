import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AgentsService } from '../services/agents.service'; // Import the AgentsService
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private agentsService: AgentsService) {}

  // function handles agent login
  login(email: string, password: string): Observable<boolean> {
    return this.agentsService.getAllAgents().pipe(
      map((agents: any[]) => {
        const agent = agents.find(
          (agent) => agent.agentEmail === email && agent.password === password
        );

        if (agent) {
          // Store the agent's role and ID in sessionStorage
          this.setRole(agent.role);
          this.setAgentId(agent.id);
          return true; // Successful login
        }

        return false; // Failed login
      }),
      catchError(() => {
        return of(false); // Handle errors and return false for failed login
      })
    );
  }

  // Store the agent's role in sessionStorage
  setRole(role: string): void {
    sessionStorage.setItem('role', role);
  }

  // Retrieve the agent's role from sessionStorage
  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  // Store the agent's ID in sessionStorage
  setAgentId(agentId: string): void {
    sessionStorage.setItem('agentId', agentId);
  }

  // Retrieve the agent's ID from sessionStorage
  getAgentId(): string | null {
    return sessionStorage.getItem('agentId');
  }

  // Remove role and agentId from sessionStorage and navigate to the login page
  logout(): void {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('agentId');
    this.router.navigate(['/login']);
  }
}
