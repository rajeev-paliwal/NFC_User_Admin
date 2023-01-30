import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Router} from '@angular/router' ; 
import { FormBuilder , Validator, Validators ,FormGroup } from '@angular/forms';

import { UserloginService } from '../../services/userlogin.service';
import { ToastrService } from 'ngx-toastr';
import { ClsUserloginReq, ClsUserloginRes } from '../../model/cls-userlogin';
import { Scurity } from 'src/app/model/security/scurity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , AfterViewInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    error: {};
    loginError: string;
    user : ClsUserloginRes;
    userreq : ClsUserloginReq;
    loading = false;
    constructor(private Scurity :  Scurity ,
private route : Router ,private fb:FormBuilder , private service : UserloginService ,private toastr: ToastrService) { 
            console.log("hello");

    }

  ngOnInit(): void {
    if (this.service.isloggedin()) {
        /// Form Bulider 
        if (this.service.verifyTokenData()) {
          
          this.route.navigate(['dashboard'])
        }else {
            this.loginForm = this.fb.group({
            userName :['' ,Validators.required],
            password : ['' ,Validators.required]  });

  this.service.logout();
      }
   }else {
    this.loginForm = this.fb.group({
    userName :['' ,Validators.required],
    password : ['' ,Validators.required]  });

  this.service.logout();
}
  }
  
  get username() { 
    
    return this.loginForm.get('userName'); 
  }
  get password() {     return this.loginForm.get('password'); }
  ngAfterViewInit(){
    $('.login-content [data-toggle="flip"]').click(function() {
      $('.login-box').toggleClass('flipped');
      return false;
    });
  }
  loginClick(){
    this.route.navigate(['dashboard'])
  }
  
  onSubmit(){
   // alert(this.username?.value+","+this.password?.value)
    //alert("ok");
    //this.route.navigate(['dashboard'])

    this.submitted = true;
    this.loading =true ;
     this.service.login(this.username?.value, this.password?.value).subscribe((data:any) => {
     // debugger ;
       if (data!==null ){
       if( data.Status==true){
              let x :string  =   (data['Data']['token']==null?"":data['Data']['token']);
              if(x!==""){
                  localStorage.setItem("token" , x.split(":")[0]);
                  localStorage.setItem("user" , JSON.stringify(data));
                }
            
                Scurity.SetCardHolderid(data['Data']['CardHolderid']);  
                Scurity.setUniqId(data['Data']['UniqId']);  
                Scurity.SetFirstName(data['Data']['FirstName']);  
                Scurity.SetMiddleName(data['Data']['MiddleName']);  
                Scurity.SetLastName(data['Data']['LastName']);  
                Scurity.Settoken(data['Data']['token']);  
                Scurity.SetEmail(data['Data']['Email']);  
                Scurity.SetIsActive(data['Data']['IsActive']); 
                Scurity.SetProfilepic(data['Data']['Photo']); 
                this.loading =false ;
                       //   alert(Scurity.Gettoken());
                //if (this.service.isloggedin()) {
                    const redirect = this.service.redirectURL ? this.service.redirectURL : '/dashboard';
                    this.route.navigate([redirect]);
                //  } else {
                  //  debugger ;
                    // this.loginError = data.Message;
                    // this.toastr.error(this.loginError, 'Error', {
                    //   timeOut: 3000
                  //  });
                  //}
        }else{
        this.loginError = data.Message;
          this.toastr.error(this.loginError, 'Error', {   timeOut: 3000 });
          this.loading =false ; 
        }
      }else{
        this.loginError = data.Message;
        this.toastr.error(this.loginError, 'Error', {   timeOut: 3000 });
        this.loading=false ; 
      }
    },
      error => {
      //  debugger ; 
        //console.error(error);
        this.error = "Error:" + "<br /> "  +  "Somthing Wen wrong Connect your Admin" ;
        this.toastr.error("Somthing Wen wrong Connect your Admin","Error:", {
          timeOut: 3000
        });}
    );

  }
}
