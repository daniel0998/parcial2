import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ListService } from '../../../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  idProyecto: any;
  selectedFile: any;
  registerTaskData: any;
  listData: any;
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  constructor(
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private rutaActiva: ActivatedRoute,
    private _listService: ListService,
    private _router: Router
  ) {
    this.listData = {};
    this.taskData = {};
    this.registerTaskData = {};
  }

  ngOnInit(): void {
    this.idProyecto = this.rutaActiva.snapshot.params['_id'];
    this._listService.listList(this.idProyecto).subscribe({
      next: (v) => {
        this.listData = v.listaList;
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });
  }

  saveTask() {
    console.log(this.registerTaskData);
    if (!this.registerTaskData.name || !this.registerTaskData.description) {
      this.message = 'Failed process: Incomplete data';
      this.openSnackBarError();
    } else {
      const data = new FormData();

      if (this.selectedFile != null) {
        data.append('image', this.selectedFile, this.selectedFile.name);
      }
      data.append('name', this.registerTaskData.name);
      data.append('description', this.registerTaskData.description);
      data.append('listId', this.registerTaskData.listId);
      this._taskService.saveTask(data).subscribe({
        next: (v) => {
          this._router.navigate(['dashboard/listProyect/listList/' + this.idProyecto]);
          this.message = 'Task create';
          this.openSnackBarSuccesfull();
          this.registerTaskData = {};
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        },
      });
    }
  }

  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
