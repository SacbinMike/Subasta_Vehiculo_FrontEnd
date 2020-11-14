import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/model/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(private loginService:LoginService,private router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

    if(this.loginService.isAuthenticated()){
      if(this.isTokenExpirado()){
        this.loginService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      console.log('tienes todos los permisos')
      return true;
    }

    console.log('Acceso denegado')
    this.router.navigate(['/login']);
    return false;
  }

  isTokenExpirado(): boolean{
    let token=this.loginService.token;
    let payload=this.loginService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if(payload.exp<now){
      return true;
    }
    return false;
  }
  
}


