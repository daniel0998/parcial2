import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private env: string;
  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }
  listTask(_id: string) {
    return this._http.get<any>(this.env + 'task/listTask/' + _id);
  }

  saveTask(data: any) {
    return this._http.post<any>(this.env + 'task/saveTaskImg', data);
  }

  deleteTask(id: any) {
    return this._http.delete<any>(this.env + 'task/deleteTask/' + id._id);
  }

  updateTask(task: any) {
    return this._http.put<any>(this.env + 'task/updateTask', task);
  }

  getTask(_id:any){
    return this._http.get<any>(this.env + 'task/findTask/' + _id);
  }
}
