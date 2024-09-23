import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  constructor(private http: HttpClient) { }

  getAllAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/agent`);
  }

  getAgentById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/agent//${id}`);
  }
  deleteAgent(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/agent/${id}`);
  }
  save(agent: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/agent`, agent);
  }
  getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/complaints`);
  }
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/roles`);
  }
}