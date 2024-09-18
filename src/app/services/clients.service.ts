import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/client`);
  }
  getClientById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/client/${id}`);
  }
  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/client/${id}`);
  }

  getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/complaints`);
  }
  save(client: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/client`, client);
  }
}
