import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consumer } from '../models/Consumer';

const base_url = "http://localhost:3000/Consumer"

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http: HttpClient) { }
  getConsumer(){
    const endpoint = `${base_url}/`;
    return this.http.get<Consumer[]>(endpoint)
  }
  saveConsumer(body:any){
    const endpoint = `${base_url}/`;
    return this.http.post<Consumer>(endpoint, body)
  }
  deleteConsumer(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.delete<Consumer>(endpoint)
  }
}
