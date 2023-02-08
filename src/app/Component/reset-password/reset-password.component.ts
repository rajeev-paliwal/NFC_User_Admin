import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carddata, PasswordUpdateReq, PasswordUpdateResponse } from 'src/app/model/carddata';
import { CardDataService } from 'src/app/services/card-data.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 

  EditemployeeForm: FormGroup = this.builder.group({
      ID: ['0'],
      UserName: ['' ,Validators.required],
      Opwd: ['' ,Validators.required],
   
      Pwd: ['' ,[Validators.required  ,Validators.minLength(6)]],
  
      Rpwd : ['' ,Validators.required],
      //Photo : [this.data.ele.FirstName,''],
     
  });
  EmpId: number;
  passrestReq : PasswordUpdateReq ; 
  
  PasswordUpdateresP:PasswordUpdateResponse;
  optype :string ; 
  EmpData: any;
  employee: Carddata;
  PasswordMissmatchError :boolean =false ; 
  OldPasswordMissmatchError :boolean =false ; 
  UserIdMissmatchError :boolean =false ; 
  
  event: EventEmitter<any> = new EventEmitter();

  constructor(private builder: FormBuilder, private employeeService: CardDataService, public dialogRef: MatDialogRef<DashboardComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    )
     {
      this.employee  = new Carddata();
      this.employee= this.data.ele;
        
  }


  OldPasswordValidation(){
    if (this.EditemployeeForm.get('Opwd')?.value!= this.employee.pwd){
      this.OldPasswordMissmatchError =true ; 
      this.EditemployeeForm.controls['OPwd'].setErrors({error:"Password Is Not correct"})
       return;
     
    }else {
      this.OldPasswordMissmatchError =false ; 
    }
    
  }
  userNameValidation(){
    if (this.EditemployeeForm.get('UserName')?.value!= this.employee.UserName){
      this.UserIdMissmatchError =true ; 
      this.EditemployeeForm.controls['UserName'].setErrors({error:"User Name Is Not correct"})
      return ; 
     
    }else {
      this.UserIdMissmatchError =false ; 
    }
  }
  NewandRetypePasswordMatchValidation(){
    if (this.EditemployeeForm.get('Pwd')?.value!= this.EditemployeeForm.get('Rpwd')?.value){
      this.PasswordMissmatchError =true ; 
      this.EditemployeeForm.controls['Rpwd'].setErrors({error:"Password and Retype Password not Matched"})
      return ; 
     
    }else {
      this.PasswordMissmatchError =false ; 
    }
  }
  onEditPostFormSubmit() {
 
  this.NewandRetypePasswordMatchValidation();
  this.userNameValidation()
  this.OldPasswordValidation()
  if (!this.OldPasswordMissmatchError && !this.PasswordMissmatchError && !this.UserIdMissmatchError){
    this.passrestReq = new PasswordUpdateReq();
    this.passrestReq.CardHolderid =  this.employee.CardHolderid ; 
    this.passrestReq.UniqId = this.employee.UniqId ; 
    this.passrestReq.UserName = this.EditemployeeForm.get('UserName')?.value; 
    this.passrestReq.Pwd = this.EditemployeeForm.get('Opwd')?.value;
    this.passrestReq.Rpwd = this.EditemployeeForm.get('Rpwd')?.value;
    
 


    this.employeeService.UpdatePassword(this.passrestReq).subscribe((data:any )=> {
      if(data!=null){
        // this.PasswordUpdateresP = data.data.data ;
        // if (this.PasswordUpdateresP.Data==1){
      this.event.emit('OK');
     this.dialogRef.close(data);
      // }}
      // else if(this.PasswordUpdateresP.Data==2) {

      // }else{

       }
    });
  }
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit() {
   
  }


}

