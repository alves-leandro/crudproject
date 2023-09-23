import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private _http: HttpClient) {}

  addClient(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/api/clients', data);
  }

  updateClient(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/api/clients/${id}`, data);
  }

  getClientList(): Observable<any> {
    return this._http.get('http://localhost:8080/api/clients');
  }

  deleteClient(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/api/clients/${id}`);
  }
}