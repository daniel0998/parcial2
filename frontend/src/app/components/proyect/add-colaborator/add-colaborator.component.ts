import { Component, OnInit } from '@angular/core';
import {ProyectsService} from '../../../services/proyects.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-colaborator',
  templateUrl: './add-colaborator.component.html',
  styleUrls: ['./add-colaborator.component.css']
})
export class AddColaboratorComponent implements OnInit {
  updateData: any;
  message: string = '';
  idProyecto: any;
  proyectColab:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  constructor(
    private _proyectService: ProyectsService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private rutaActiva: ActivatedRoute,
  ) { 
    this.proyectColab={};
    this.updateData={};
    this.idProyecto= this.rutaActiva.snapshot.params["_id"];
  }

  ngOnInit(): void {
    this._proyectService.listCollaborators(this.idProyecto).subscribe({
      next: (v) => {
        this.proyectColab = v.arrayColab;
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });
  }
  addColaborator(){
    if (
      !this.updateData.email 
    ) {
      this.message = 'failed process: incomplete data ';
      this.openSnackBarError();
    }else{
      this._proyectService.addCollaborators(this.idProyecto,this.updateData).subscribe({
        next:(v) => {
          this.ngOnInit();
          this.message = "Successful add colaborator"
          this.openSnackBarSuccesFull();
          this.updateData.email = ""
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        }
      });
    }
  }

   deleteCollaborator () {

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
