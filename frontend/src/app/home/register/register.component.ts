import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
  }

  ngOnInit(): void {}

  registerUser() {
    const flag = (this.registerData.password==this.registerData.password2);
    if (
      !this.registerData.name ||
      !this.registerData.email  ||
      !this.registerData.password ||
      !this.registerData.password2
    ) {
      this.message = 'failed process: incomplete data ';
      this.openSnackBarError();
    } else if(!flag) {
        this.message = 'failed process: password does not match';
        this.openSnackBarError();
    }else{
      this._userService.registerUser(this.registerData).subscribe({
        next:(v) => {
          localStorage.setItem('token', v.token);
          this._router.navigate(['/dashboard/listProyect']);
          this.message = "Successful user registration"
          this.openSnackBarSuccesFull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        }
      });
    }
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