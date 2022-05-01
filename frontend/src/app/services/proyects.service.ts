import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  private env: string;
  constructor(private _http: HttpClient , private _router: Router) {
    this.env = environment.APP_URL;
   }
   listProyect(){
    return this._http.get<any>(this.env + 'proyect/listProyectAdmin');
   }
   saveProyect(proyect: any){
    return this._http.post<any>(this.env + 'proyect/saveProyect', proyect);
   }
   addCollaborators(idProyecto: any,proyect: any){
    return this._http.put<any>(this.env + 'proyect/updateCollaborators/'+idProyecto , proyect);
   }
   listCollaborators(idProyecto: string){
    return this._http.get<any>(this.env + 'proyect/listCollaborators/'+idProyecto );
   }
   listProyectColab(){
    return this._http.get<any>(this.env + 'proyect/listProyectColab/' );
   }
   delete(proyect: any){
    return this._http.delete<any>(this.env + 'proyect/deleteProyect/'+ proyect._id);

   }
}
