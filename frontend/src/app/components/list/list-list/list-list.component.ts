import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ListService } from '../../../services/list.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.css'],
})
export class ListListComponent implements OnInit {
  listId: any;
  listData: any;
  registerDataList: any;
  message: string = '';
  selectedFile: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  idProyecto: any;

  constructor(private rutaActiva: ActivatedRoute,private _listService: ListService,
    private _snackBar: MatSnackBar,public _router: Router) {
     this.listData={};
     this.registerDataList={};
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

  deleteList(list: any) {
    this._listService.deleteList(list).subscribe({
      next: (v) => {
        let index = this.listData.indexOf(list);
        if (index > -1) {
          this.listData.splice(index, 1);
          this.message = v.message;
          this.openSnackBarSuccesFull();
        }
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });
  }

  saveList(){
    this.idProyecto= this.rutaActiva.snapshot.params["_id"];
    
    if (
      !this.registerDataList.name ||
      !this.registerDataList.description  
    ) {
      this.message = 'failed process: incomplete data ';
      this.openSnackBarError();
    }else{
      this._listService.saveList(this.idProyecto,this.registerDataList).subscribe({
        next:(v) => {
          this.ngOnInit();
          this.clean();
          this.message = "Successful List registration"
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
    this.registerDataList.name=''
    this.registerDataList.description=''
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

  
