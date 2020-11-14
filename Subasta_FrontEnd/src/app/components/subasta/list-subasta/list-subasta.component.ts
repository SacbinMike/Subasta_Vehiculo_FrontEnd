import { Component, OnInit } from '@angular/core';
import { Subasta } from 'src/app/model/class/subasta';
import { SubastaService } from '../../../model/service/subasta.service';

@Component({
  selector: 'app-list-subasta',
  templateUrl: './list-subasta.component.html',
  styleUrls: ['./list-subasta.component.css']
})
export class ListSubastaComponent implements OnInit {

  public subastas:Subasta[];

  constructor(private subastaService:SubastaService) { }

  ngOnInit() {
    this.findAll();
  }

  private findAll():void{
    this.subastaService.findAll().subscribe(
      response=>{
        this.subastas=response;
        console.log(response);
      }
    )
  }

}
