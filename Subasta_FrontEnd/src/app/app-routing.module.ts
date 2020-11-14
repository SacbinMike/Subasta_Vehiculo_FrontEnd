import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUsuarioComponent } from './components/usuario/form-usuario/form-usuario.component';
import { AuthGuard } from './components/usuario/guard/auth.guard';
import { RoleGuard } from './components/usuario/guard/role.guard';
import { LoginComponent } from './components/usuario/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { ListSubastaComponent } from './components/subasta/list-subasta/list-subasta.component';
import { FormSubastaComponent } from './components/subasta/form-subasta/form-subasta.component';

const routes: Routes = [

  {path:'login',component:LoginComponent},
  {path:'subasta',component:ListSubastaComponent},
  {path:'form-subasta', component:FormSubastaComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
  {path:'usuario',component:UsuarioComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
  {path:'form-usuario',component:FormUsuarioComponent, canActivate:[AuthGuard]},
  {path:'**',pathMatch:'full', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
