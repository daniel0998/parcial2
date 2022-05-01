import { Component, OnInit } from '@angular/core';
import {ProyectsService} from '../../../services/proyects.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-proyect',
  templateUrl: './list-proyect.component.html',
  styleUrls: ['./list-proyect.component.css']
})
export class ListProyectComponent implements OnInit {
  registerDataProyect: any;
  proyectData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  constructor(
    private _proyectService: ProyectsService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public _userService: UserService) {

      this.proyectData = {};
      this.registerDataProyect={}
     }

  ngOnInit(): void {
    this._proyectService.listProyect().subscribe({
      next: (v) => {
        this.proyectData = v.ProyectList;
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });

  }
  saveProyect(){
    if (
      !this.registerDataProyect.name ||
      !this.registerDataProyect.description  
    ) {
      this.message = 'failed process: incomplete data ';
      this.openSnackBarError();
    }else{
      this._proyectService.saveProyect(this.registerDataProyect).subscribe({
        next:(v) => {
          this.ngOnInit();
          this.clean();
          this.message = "Successful Proyect registration"
          this.openSnackBarSuccesFull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        }
      });
    }
  }
  clean(){
    this.registerDataProyect.name=''
    this.registerDataProyect.description=''
  }
  delete(proyect:any) {
    this._proyectService.delete(proyect).subscribe({
      next: (v) => {
        let index= this.proyectData.indexOf(proyect);
        if(index > -1 ){
          this.proyectData.splice(index,1)
          this.message=v.message;
          this.openSnackBarSuccesFull();
        }
        
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();

      },
    });
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