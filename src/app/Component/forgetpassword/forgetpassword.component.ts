import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import{FormBuilder,Validators}from '@angular/forms'

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit  {
  ForgetPassForm = this.fb.group({
 
   email :["",Validators.required]
  });
  isDisabled :boolean =true ;
   constructor(private fb : FormBuilder) { }
 
   ngOnInit(): void {
    
      
   }
 
 }
 