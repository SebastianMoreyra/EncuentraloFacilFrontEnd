import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    }).pipe(map((response: HttpResponse<any>)=> {
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      if (bearerToken) {
        const token = bearerToken.replace('Beare','');
        localStorage.setItem('token',token);
      }
      // const token = bearerToken.replace('Beare','');

      // localStorage.setItem('token',token);

      return body;
    }))
  }

  getToken(){
    return localStorage.getItem('token');
  }



}
