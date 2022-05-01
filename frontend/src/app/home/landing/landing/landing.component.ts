import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { MailService } from 'src/app/services/mail.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  mailData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    public _userService: UserService,
    private _mailService: MailService,
    private _snackBar: MatSnackBar
  ) {
    this.mailData = {};
  }

  ngOnInit(): void {
  }

  contactMail() {
  
    if (!this.mailData.email || !this.mailData.phone || !this.mailData.name || !this.mailData.message) {
      this.message = 'failed process: incomplete data';
      this.openSnackBarError();
    } else {
      this._mailService.contactMail(this.mailData).subscribe({
        next: (v) => {
          this.message = "The mail has been sent successfully"
          this.openSnackBarSuccesFull();
          this.mailData.email = ""
          this.mailData.phone = ""
          this.mailData.name = ""
          this.mailData.message = ""
        },
        error: (e) => {
          console.log(e);
          this.message = e.error.message;
          this.openSnackBarError();
        },
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

