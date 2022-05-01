import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private env: string;
  constructor(private _http: HttpClient , private _router: Router) {
    this.env = environment.APP_URL;
   }
   contactMail(contact:any){
    return this._http.post<any>(this.env + 'mail/contactMail', contact);
   }
}
