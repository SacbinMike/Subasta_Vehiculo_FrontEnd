import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Subasta } from '../class/subasta';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubastaService {

  private urlEndPoint:string=environment.URL_BACKEND+'/api-subasta';

  constructor(private http:HttpClient) { }

  public store(subasta:Subasta):Observable<Subasta>{
    return this.http.post<Subasta>(`${this.urlEndPoint}/subasta`,subasta).pipe(
      map((response:any)=>response as Subasta),
      catchError(err=>{
          if(err.status==400){
            return throwError(err);
          }

          return throwError(err);
      })
    )
  }

  public findAll():Observable<Subasta[]>{
    return this.http.get<Subasta[]>(this.urlEndPoint+'/subasta');
  }
}
