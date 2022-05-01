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
  selector: 'app-list-proyect-colab',
  templateUrl: './list-proyect-colab.component.html',
  styleUrls: ['./list-proyect-colab.component.css']
})
export class ListProyectColabComponent implements OnInit {
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
      
     }

  ngOnInit(): void {
    this._proyectService.listProyectColab().subscribe({
      next: (v) => {
        this.proyectData = v.arrayProyectosColab;
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