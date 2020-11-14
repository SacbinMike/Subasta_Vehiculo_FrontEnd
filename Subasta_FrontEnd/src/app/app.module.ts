import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FormUsuarioComponent } from './components/usuario/form-usuario/form-usuario.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ListSubastaComponent } from './components/subasta/list-subasta/list-subasta.component';
import { FormSubastaComponent } from './components/subasta/form-subasta/form-subasta.component';
import { TokenInterceptor } from './model/service/interceptors/token.interceptor';
import { AuthInterceptor } from './model/service/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FormUsuarioComponent,
    LoginComponent,
    UsuarioComponent,
    ListSubastaComponent,
    FormSubastaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
