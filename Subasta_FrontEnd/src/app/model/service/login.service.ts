import { Injectable } from '@angular/core';
import { Usuario } from '../class/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _usuario: Usuario;
  private _token: string;
  public  id:number;

  constructor(private http:HttpClient) { }

  public get usuario(): Usuario{ 

    if(this._usuario !=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem('usuario') !=null){
      this._usuario=JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token():string{

    if(this._token !=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token') !=null){
      this._token=sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  public login(usuario:Usuario):Observable<any>{

    //const urlEndPoint='http://localhost:8081/oauth/token';
    const urlEndPoint=environment.URL_BACKEND+'/oauth/token';
    const credenciales=btoa('appangular' + ':' + ',-[/~!#4j4%r@zz7i9=.');
    const httpHeaders=new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Basic '+credenciales});
     let params = new URLSearchParams();
     params.set('grant_type','password');
     params.set('username',usuario.username);
     params.set('password',usuario.password);
    // console.log(params.toString());
    return this.http.post<any>(urlEndPoint,params.toString(),{headers:httpHeaders});

  }

  public guardarUsuario(accessToken: string): void {
    const payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.username=payload.user_name;
    this._usuario.roles=payload.authorities;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }

  public guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  } 

  isAuthenticated():boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload !=null && payload.user_name && payload.user_name.length>0){
      //this.id=payload.id_usuario;//valor sin logica
      return true;
    }
    return false;
  }

  logout(){
    this._token=null;
    this._usuario=null;
    //sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  hasRole(role:any):boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }


}
