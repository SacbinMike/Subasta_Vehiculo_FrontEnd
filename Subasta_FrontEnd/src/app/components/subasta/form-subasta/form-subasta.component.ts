import { Component, OnInit } from '@angular/core';
import { FechaSubasta } from 'src/app/model/class/fecha-subasta';
import { FechaSubastaService } from '../../../model/service/fecha-subasta.service';
import { HoraSubasta } from '../../../model/class/hora-subasta';
import { TiempoSubasta } from '../../../model/class/tiempo-subasta';
import { TiempoSubastaService } from '../../../model/service/tiempo-subasta.service';
import { HoraSubastaService } from '../../../model/service/hora-subasta.service';
import { Subasta } from 'src/app/model/class/subasta';
import { SubastaService } from '../../../model/service/subasta.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-subasta',
  templateUrl: './form-subasta.component.html',
  styleUrls: ['./form-subasta.component.css']
})
export class FormSubastaComponent implements OnInit {

  public fechaSubasta:FechaSubasta[];
  public arrHoraSubasta:HoraSubasta[];
  public arrTiempoSubasta:TiempoSubasta[];
  public subasta:Subasta= new Subasta();
  public loading:boolean=false;

  constructor(private fechaService:FechaSubastaService,
              private horaSubasta:HoraSubastaService,
              private tiempoSubasta:TiempoSubastaService,
              private subastaService:SubastaService,
              private router:Router) { }

  ngOnInit() {

    this.findAllFechaSubasta();
    this.findAllHoraSubasta();
    this.findAllTiempoSubasta();
  }

  private findAllFechaSubasta(){
    this.fechaService.findAll().subscribe(
      response=>{
        this.fechaSubasta=response;
        console.log(this.fechaSubasta);
      }
    );
  }

  private findAllHoraSubasta():void{
    this.horaSubasta.findAll().subscribe(
      response=>{
        this.arrHoraSubasta=response;
        console.log(this.arrHoraSubasta)
      }
    )
  }

  private findAllTiempoSubasta():void{
    this.tiempoSubasta.findAll().subscribe(
      response=>{
        this.arrTiempoSubasta=response;
        console.log(this.arrTiempoSubasta)
      }
    )
  }


  public store(subastaForm):void{
    this.loading=true;
    this.subastaService.store(this.subasta).subscribe(
      response=>{
         this.loading=false;
         console.log(response);
         Swal.fire('Exito', 'La subasta fue registrado correctamente','success');
        this.router.navigate(['/subasta']);
          
      },
      err=>{
        this.loading=false;
        console.log('ERROR, No fue posible realizar el registro');
        Swal.fire('Eroor','no es posible hacer el registro','error');
      }
    )
    console.log('Registrando datos');
    console.log(this.subasta)
    console.log(subastaForm)
  }

}
