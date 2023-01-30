import { Injectable } from '@angular/core';
import {HttpClient , HttpErrorResponse} from '@angular/common/http'

import { from, Observable, throwError } from 'rxjs';
import{map ,catchError} from 'rxjs/operators'
import {ClsUserloginReq,ClsUserloginRes} from '../model/cls-userlogin'
import { Scurity } from '../model/security/scurity';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
   ob : ClsUserloginReq;
  serverURL = "http://cardapi.uniquecard.online/User/";
  //serverURL = "http://localhost:8080/User/";
 
  errorData:{};
  redirectURL :string ;
  constructor(private http : HttpClient ,private scurity: Scurity ,private route : Router) { }
  login(username :string , password :string ):Observable<any>{
    this.ob = new ClsUserloginReq();
    this.ob.userPwd = password ; 
    this.ob.username =username ; 
     return this.http.post<any>(this.serverURL+"Login", this.ob ).pipe(
      //map(
    //   (data:any)=>{
    //      if(data){
    //       let x :string  =   (data['Data']['token']==null?"":data['Data']['token']);
    //       if(x!==""){
    //       localStorage.setItem("token" , x.split(":")[0]);
    //       localStorage.setItem("user" , JSON.stringify(data));
    //       }else{
    //        // localStorage.removeItem()
    //       }
        
    //       Scurity.SetCardHolderid(data['Data']['CardHolderid']);  
    //       Scurity.setUniqId(data['Data']['UniqId']);  
    //       Scurity.SetFirstName(data['Data']['FirstName']);  
    //       Scurity.SetMiddleName(data['Data']['MiddleName']);  
    //       Scurity.SetLastName(data['Data']['LastName']);  
    //       Scurity.Settoken(data['Data']['token']);  
    //       Scurity.SetEmail(data['Data']['Email']);  
    //       Scurity.SetIsActive(data['Data']['IsActive']); 
    //        //alert(Scurity.Gettoken());
    //      }
    //  }),
     catchError(this.handleError)
     );
  }
  handleError(error:HttpErrorResponse){
    // debugger ;
      if(error.error instanceof ErrorEvent){
         console.error(error.error.message);
      }else {
        console.error("Backend return Code :" +error.status + "body was :"+ error.statusText);
      }
      if(error.status==401){
        this.errorData= {

          errorTitle : 'Username or Password Invalid',
          errorDesc :'Invalid Username or Password '
        }
      }else{
      this.errorData= {

        errorTitle : 'Request Is failed',
        errorDesc :'Somthing Bab happen please try again later'
      }
    }
      return throwError(this.errorData);
  }

  gettoken(){
    return JSON.parse( localStorage.getItem("user")!).Data.token ;// localStorage.getItem("token" );
  } 

  verifyTokenData(){
    //let x :string  =  Scurity.Gettoken(); 
    //alert(Scurity.Gettoken());
   //if(localStorage.getItem("token" )==x){}
    if(localStorage.getItem("token" )!==null && localStorage.getItem("token" )!==undefined ){
      return true;
    }else {
      return false ;
    }
  }
  logout (){
    localStorage.removeItem("token" );
    localStorage.removeItem("user" );
    this.route.navigate(['login']);
  }
  isloggedin(){
    if( localStorage.getItem("token" )){
      return true;
    }else {
      return false ;
    }
  }
}
