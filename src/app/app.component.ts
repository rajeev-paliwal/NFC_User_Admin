import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClsUserloginRes } from './model/cls-userlogin';
import { UserloginService } from './services/userlogin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit , AfterContentChecked ,OnInit{
  logedInuser :ClsUserloginRes; 
  constructor(private service: UserloginService ,private cdr: ChangeDetectorRef,
    private router : Router){

  }
  ngOnInit(){
   // this.islogin =false ;
    this.router.navigate(['login']);
  }
  ngAfterContentChecked(): void {
    // this.islogin= this.service.isloggedin();
    
    // this.cdr.detectChanges();
  }
 
  ngAfterViewInit(): void {
  
    //alert(this.islogin);
  }
  title = 'Card User';

  islogin = false ; 


}

