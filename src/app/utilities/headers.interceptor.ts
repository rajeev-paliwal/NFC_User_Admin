import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';



import { UserloginService } from '../services/userlogin.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private authService: UserloginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isloggedin()) {
      // debugger ;
       const authToken ="Bearer "+ this.authService.gettoken()  //+":" + JSON.parse( localStorage.getItem("user")!).Data.CardHolderid;
       //alert(authToken);
             request = request.clone({
           setHeaders:
               { Authorization: authToken }
           }
       );
   }
   
  
    return next.handle(request);
  }
}
