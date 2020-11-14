import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TiempoSubasta } from '../class/tiempo-subasta';

@Injectable({
  providedIn: 'root'
})
export class TiempoSubastaService {

  private urlEndPoint:string=environment.URL_BACKEND+'/api-subasta';

  constructor(private http:HttpClient) { }

  public findAll():Observable<TiempoSubasta[]>{
    return this.http.get<TiempoSubasta[]>(this.urlEndPoint+'/tiempo-subasta');
  }
}
