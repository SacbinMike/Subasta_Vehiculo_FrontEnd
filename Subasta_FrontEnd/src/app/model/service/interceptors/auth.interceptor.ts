import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {LoginService} from '../../../model/service/login.service';

import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

 constructor(private loginService:LoginService,
             private router:Router,
            // private toastr:ToastrService
             ){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e=>{
        if(e.status==401){
          if(this.loginService.isAuthenticated()){
            this.loginService.logout();
          }
          this.router.navigate(['/login'])
        }

        if(e.status==403){
         // this.toastr.warning("No tienes permisos suficientes","Acceso Denegado");
          this.router.navigate(['/estado-cuenta']);
        }

        return throwError(e);

      })
    );
  }
}
