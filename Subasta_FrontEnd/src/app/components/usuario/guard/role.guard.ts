import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/model/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate{

  constructor(private loginService:LoginService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.loginService.isAuthenticated()){
        console.log('tienes todos los permisos')
        this.router.navigate(['/login']);
        return false;
    }

    let role=next.data['role'] as string;
    console.log(role);
    if (this.loginService.hasRole(role)){
      return true;
    }
    
    //Swal.fire('Acceso denegado','No tienes acceso a este recurso','warning');
    console.log('no tienes privilegios suficientes para esta ruta')
    this.router.navigate(['/form-usuario']);
    return false;
  
   }

   

  }
