import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../model/service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public loginService:LoginService,
              private router:Router) { }

  ngOnInit() {
  }

  public logout():void{

    this.loginService.logout();
    this.router.navigate(['/login']);

  }
}
