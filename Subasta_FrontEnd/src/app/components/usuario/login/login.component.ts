import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/class/usuario';
import { LoginService } from 'src/app/model/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario:Usuario;

  constructor(private loginService:LoginService, private router:Router) { 
    this.usuario= new Usuario();
  }

  ngOnInit() {
    if(this.loginService.isAuthenticated()){
      //this.toastr.info('Ya ha iniciado session' ,'Detalle');
      this.router.navigate(['/usuario']);
    }
  }

  public login():void{
    if(this.usuario.username === '' || this.usuario.password === ''){
      this.errorsmsg();
      return;
    }
    this.loginService.login(this.usuario).subscribe(
      response=>{
        //console.log(response);
        const objetoPayload = JSON.parse(atob(response.access_token.split(".")[1]));
        //console.log(objetoPayload);//estos componentes son opcionales
        //console.log(objetoPayload.info_adicional);//estos componentes son opcionales
        //console.log(objetoPayload.nombre_real);//estos componentes son opcionales
        
        this.loginService.guardarUsuario(response.access_token);
        this.loginService.guardarToken(response.access_token);

        this.usuario=this.loginService.usuario;
        
        this.router.navigate(['/subasta']);
        //this.toastr.success('Bienvenido nuevamente',`${objetoPayload.nombre_real}`);
      },
      err=>{
        if(err.status==400){
          //this.toastr.error("Usuario o Password Incorrecto",'Error');
        }
      }
    )
  }

  errorsmsg(){ 
    //this.toastr.error("Usuario o Password vacios",'Error')
    console.log('Error credenciales vacias')
  }

}
