import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/category`);
  }

  getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/complaints`);
  }
  getComplaintById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/complaints/${id}`);
  }

  getStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/status`);
  }

  save(complaint: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/complaints`, complaint);
  }
  deleteData(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/complaints/${id}`);
  }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/client`);
  }
  getAllAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/agent`);
  }
  getTotalComplaints(): Observable<number> {
    return this.http.get<number>(`${API_URL}/complaints/count`);
  }

  getComplaintsByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${API_URL}/complaints/count/status?status=${status}`);
  }
  
  getAssignedComplaints(agentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/complaints/assigned-complaints`, {
      headers: { 'agentId': agentId.toString() }
    });
  }
  
  
}
