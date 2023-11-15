import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';


import { Observable } from 'rxjs';
import { ApiService } from '../services/auth-services/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private apiService: ApiService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.apiService.getToken();

    if (token) {
      // Use the set method to update the headers and then clone the request
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(cloned);
    }

    return next.handle(request);
  }
}

//     if(token){
//       const cloned = request.clone((
//         headers: request.headers.set('Authorization',`Bearer ${token}`)
//       ))
//       return next.handle(cloned);
//     }
//     return next.handle(request);
//   }
// }
