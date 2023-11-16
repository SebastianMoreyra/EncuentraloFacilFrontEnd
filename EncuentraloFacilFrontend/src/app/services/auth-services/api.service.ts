import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Credentials } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }
  login(creds:Credentials){
    return this.http.post('http://localhost:8080/auth/login',creds,{
      observe: 'response'
    }).pipe(tap((response: any)=> {
      localStorage.setItem('token',response.body.token);

      //return body;
    }))
  }

  getToken(){
    return localStorage.getItem('token');
  }



}
