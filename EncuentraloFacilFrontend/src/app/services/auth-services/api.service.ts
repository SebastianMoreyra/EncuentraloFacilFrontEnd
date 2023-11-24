import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Credentials } from 'src/app/models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private jwtHelper: JwtHelperService = new JwtHelperService();/////
  constructor(private http: HttpClient) {

  }
  login(creds:Credentials){
    //return this.http.post('https://backend-encuentralofacil1.onrender.com/auth/login',creds,{
    return this.http.post('http://localhost:8080/auth/login',creds,{
      observe: 'response'
    }).pipe(tap((response: any)=> {
      localStorage.setItem('token',response.body.token);
      localStorage.setItem('role',response.body.role);

      //return body;
    }))
  }

  getToken(){
    return localStorage.getItem('token');

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getUserRoles(): string {
    const role = localStorage.getItem('role');
    console.log('role:', role);
    // Manejar el caso en que el token es nulo
    if (!role) {
      console.log("no hay role")
      return "";
    }
    return role;
    // const decodedToken = this.jwtHelper.decodeToken(token);
    // console.log(decodedToken)

    // // Supongamos que los roles están almacenados en el campo 'roles' del token
    // return decodedToken && decodedToken.role ? decodedToken.role : [];
  }





}
