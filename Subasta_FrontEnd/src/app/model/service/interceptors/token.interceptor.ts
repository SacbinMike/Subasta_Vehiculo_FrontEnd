import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

 constructor(private loginService:LoginService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      let token=this.loginService.token;

      if(token !=null){
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
        return next.handle(authReq);
      }
    console.log('TokenInterceptor => Bearer ' + token);
    console.log('FUNCIONA EL INTERCEPTOR 100%'); //DEBERIA DE APARECER ESTO EN CADA PETICION HTTP QUE SE HAGA

    return next.handle(req);
  }
}