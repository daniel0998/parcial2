import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  registerData: any;
  message: string = '';
  newPass: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  idUser: any;

  constructor(
    public _userService: UserService,
    private _router: Router,
    private _Arouter: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private rutaActiva: ActivatedRoute
  ) {
    this.registerData = {};
    this.newPass = '';
  }

  ngOnInit(): void {
    this.idUser= this.rutaActiva.snapshot.params["_id"];
      this._userService.getUser().subscribe({
       next: (v) => {
          this.registerData = v.userGet;
          this.registerData.password = this.newPass;
          console.log(this.registerData);

        },
        error: (e) => {
          this.message = e.error;
          this.openSnackBarError();
        }
      
    });
  }

  updateUser() {
    if (!this.registerData.name || !this.registerData.email ) {
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
    } else {
      this._userService.updateUser(this.registerData).subscribe(
        (res) => {
          this._router.navigate(['/dashboard/listProyect']);
          this.message = 'User updated';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
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
