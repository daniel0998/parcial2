import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import {TaskService} from '../../../services/task.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  @Input() idList:any;
  taskDetail:any;
  list: any;
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  idProyecto: any;
  constructor(
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private rutaActiva: ActivatedRoute
  ) {
    this.taskData={};
    this.taskDetail={}
   }

  ngOnInit(): void {
    this.idProyecto = this.rutaActiva.snapshot.params['_id'];
    this._taskService.listTask(this.idList).subscribe({
      next: (v) => {
        this.taskData = v.taskList;
      },
      error: (e) => {
        this.message = e.error.message;
        
      },
    });
  }

  deleteTask(id:any){
    this._taskService.deleteTask(id).subscribe({
      next: (v) => {
        let index= this.taskData.indexOf(id);
        if(index > -1 ){
          this.taskData.splice(index,1)
          this.message=v.message;
          this.openSnackBarSuccesFull();
        }
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    })
  }

  updateTask(task:any,status:any){
      let tempStatus = task.taskStatus;
      task.taskStatus = status;
      this._taskService.updateTask(task).subscribe({
        next: (v) => {
          task.taskStatus = status;
          this.ngOnInit();
        },
        error: (e) => {
          task.taskStatus = tempStatus;
          this.message = e.error.message;
          this.openSnackBarError();
        },
      });
  }

  getTask(id:any){
    this._taskService.getTask(id).subscribe({
      next: (v) => {
        this.taskDetail = v.taskFind;
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    })
  }
  urlButton(){
    let flag=false
    
    if(this._router.url=="/dashboard/listProyect/listList/"+this.idProyecto){
      flag= true
    }
    return flag
  }
  openSnackBarSuccesFull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: 'style-snackbarTrue',
    });
  }
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: 'style-snackbarFalse',
    });
  }
}
