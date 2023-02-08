import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { BehaviorSubject } from "rxjs";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Carddata, PasswordUpdateReq } from './../model/carddata'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {
  employeeList: Carddata[];
  serverURL = "http://cardapi.uniquecard.online/";
  errorData: {};
  redirectURL: string;


  // New Code 

  postIdSource = new BehaviorSubject<number>(0);
  postIdData: any;

  changePostId(postId: number) {
    // debugger ;
    this.postIdSource.next(postId);
  }
  //end of new code 

  constructor(private http: HttpClient, private router : Router) {
    this.postIdData= this.postIdSource.asObservable();
   }
  GetCarddataById (ID: number , UID :string ): Observable<Carddata> {
    // debugger;
    return this.http.get<Carddata>(this.serverURL + "GetAllCardDataById?CardHolderId="+ ID.toString()+"&UnqId=" + UID.toString()).pipe(catchError(this.handleError));

  }
  getAllEmployee(): Observable<Carddata[]> {
    // debugger ;
    return this.http.get<Carddata[]>(this.serverURL + "GetAllCardData")
      .pipe(
        catchError(this.handleError)
      );
  }
  GetCarddataListById(ID: number , UID :string ): Observable<Carddata[]> {
    // debugger ;
    return this.http.get<Carddata[]>(this.serverURL + "GetAllCardDataById?CardHolderId="+ ID.toString()+"&UnqId=" + UID.toString())
      .pipe(
        catchError(this.handleError)
      );
  }
  Addemployee(Employee: Carddata) {
    // debugger ;
    return this.http.post<any>(this.serverURL + "getEmployee", Employee).pipe(catchError(this.handleError));
  }
  UpdatePassword(Employee: PasswordUpdateReq) {
    // debugger ;
    return this.http.post<any>(this.serverURL + "PasswordResetCardData", Employee).pipe(catchError(this.handleError));
  }

  Editemployee(Employee: Carddata)  : Observable<Carddata>{
  //  debugger;
    return this.http.post<any>(this.serverURL + "/UpdateCardData", Employee).pipe(catchError(this.handleError));
  }
  DeleteCardData(cardID: number , UniqId : string ) :Observable<any> {
    // debugger ; 
    return this.http.post<any>(this.serverURL + "/CardDataDelete?CardHolderId=" + cardID + "&UnqId=" +UniqId ,null).pipe(catchError(this.handleError));

  }
  
  DeActivedCardData(cardID: number , UniqId : string ) :Observable<any> {
    // debugger ; 
    return this.http.post<any>(this.serverURL + "/CardDataDeactive?CardHolderId=" + cardID + "&UnqId=" +UniqId ,null).pipe(catchError(this.handleError));

  }

  ActivedCardData(cardID: number , UniqId : string ) :Observable<any> {
    // debugger ; 
    return this.http.post<any>(this.serverURL + "/CardDataActive?CardHolderId=" + cardID + "&UnqId=" +UniqId ,null).pipe(catchError(this.handleError));

  }

  UploadProfilePic(cls_uploadpic:any):Observable<any>{
    return this.http.post<any>(this.serverURL + "/Profile/UploadProfilePic", cls_uploadpic).pipe(catchError(this.handleError));
  } 
  handleError(error: HttpErrorResponse) {
    // debugger ;
    if (error.error instanceof ErrorEvent) {
      console.error(error.error.message);
    } else {
      console.error("Backend return Code :" + error.status + "body was :" + error.statusText);
    }
    if (error.status == 401) {
      debugger;
     
      this.errorData = {

        errorTitle: 'Username or Password Invalid',
        errorDesc: 'Invalid Username or Password '
      }
      window.location.href = "/login";
    } else {
      this.errorData = {

        errorTitle: 'Request Is failed',
        errorDesc: 'Somthing Bab happen please try again later'
      }
    }
    return throwError(this.errorData);
  }
}