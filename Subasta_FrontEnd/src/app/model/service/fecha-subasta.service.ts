import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FechaSubasta } from '../class/fecha-subasta';

@Injectable({
  providedIn: 'root'
})
export class FechaSubastaService {

  //private urlEndPoint:string='http://localhost:8081/api'
  private urlEndPoint:string=environment.URL_BACKEND+'/api-subasta';


  constructor(private http:HttpClient) { }

  public findAll():Observable<FechaSubasta[]>{
    return this.http.get<FechaSubasta[]>(`${this.urlEndPoint}/fecha-subasta`);
    
  }
}
