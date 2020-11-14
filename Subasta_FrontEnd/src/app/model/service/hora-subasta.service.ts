import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HoraSubasta } from '../class/hora-subasta';

@Injectable({
  providedIn: 'root'
})
export class HoraSubastaService {

  private urlEndPoint:string=environment.URL_BACKEND+'/api-subasta';

  constructor(private http:HttpClient) { }

  public findAll():Observable<HoraSubasta[]>{
    return this.http.get<HoraSubasta[]>(this.urlEndPoint+'/hora-subasta');
  }
}
