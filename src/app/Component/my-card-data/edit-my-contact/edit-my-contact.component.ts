import { Component, EventEmitter, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carddata } from '../../../model/carddata';
import { CardDataService } from '../../../services/card-data.service';
import { DashboardComponent } from '../../../Component/dashboard/dashboard.component';


@Component({
  selector: 'app-edit-my-contact',
  templateUrl: './edit-my-contact.component.html',
  styleUrls: ['./edit-my-contact.component.css']
})
export class EditMyContactComponent implements OnInit {
  phonetype = [
    { id: "Home", name: 'Home' },
    { id: "Work", name: 'Work' },
    { id: "Cell", name: 'Cell' },
   
  ];
  selectedPhoneType = this.phonetype[0].name;
  selectedPhoneType2 = this.phonetype[1].name;
  selectedPhoneType3 = this.phonetype[2].name;
  //EditemployeeForm:FormGroup  ;
  EditemployeeForm: FormGroup = this.builder.group({
      ID: ['0'],
      // FirstName: [this.data.ele.FirstName,''],
      // MiddleName: [this.data.ele.MiddleName,''],
      // // LastName: [this.data.ele.FirstName,'', [Validators.required, Validators.minLength(3)]]
      // LastName: [this.data.ele.LastName,''],
      CardAddress : [this.data.ele.CardAddress,''],
      PhoneNo1: [this.data.ele.PhoneNo1,''],
      PhoneNoType1 : [this.data.ele.PhoneNoType1,''],
      PhoneNo2 : [this.data.ele.PhoneNo2,''],
      PhoneNoType2 : [this.data.ele.PhoneNoType2,''],
      PhoneNo3 : [this.data.ele.PhoneNo3,''],
      PhoneNoType3 : [this.data.ele.PhoneNoType3,''],
      Email : [this.data.ele.Email,''],
      Website : [this.data.ele.Website,''],
      //Organization : [this.data.ele.Organization,''],
      //Photo : [this.data.ele.FirstName,''],
      // Title : [this.data.ele.Title,''],
      // Birthday : [this.data.ele.Birthday,''],
      // Note: [this.data.ele.Note,''],
     
      // Facebook : [this.data.ele.Facebook,''],
      // LinkedIn : [this.data.ele.LinkedIn,''],
      // Instgram : [this.data.ele.Instgram,''],
      // Snapchat : [this.data.ele.Snapchat,''],
      // Telegram : [this.data.ele.Telegram,''],
      // Youtube : [this.data.ele.Youtube,''],
      // Skype : [this.data.ele.Skype,''],
      // Tweeter : [this.data.ele.Tweeter,''],
      // Tiktok : [this.data.ele.Tiktok,''],
      // Maxtakatak: [this.data.ele.Maxtakatak,''],
      // WhatsApp : [this.data.ele.WhatsApp,'']
           
            //WebURlAddress : [this.data.ele.FirstName,''],
           // UserName : [''],
  });
  EmpId: number;
 
  optype :string ; 
  EmpData: any;
  employee: Carddata;
  
  event: EventEmitter<any> = new EventEmitter();

  constructor(private builder: FormBuilder, private employeeService: CardDataService, private bsModalRef: BsModalRef
    ,public dialogRef: MatDialogRef<DashboardComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    )
     {
    
      this.selectedPhoneType= this.data.ele.PhoneNoType1;
      this.selectedPhoneType2= this.data.ele.PhoneNoType2;
      this.selectedPhoneType3= this.data.ele.PhoneNoType3;

  }




  onEditPostFormSubmit() {
    // debugger;
    this.employee  = new Carddata();
    this.employee.CardHolderid = this.data.ele.CardHolderid;
this.employee.UniqId = this.data.ele.UniqId;
this.employee.IsActive = this.data.ele.IsActive;
this.employee.Photo = this.data.ele.Photo;
this.employee.WebURlAddress = this.data.ele.WebURlAddress;
this.employee.UserName = this.data.ele.UserName;
this.employee.FirstName=this.data.ele.FirstName;
this.employee.LastName =this.data.ele.LastName;
this.employee.MiddleName =this.data.ele.MiddleName;
this.employee.CardAddress =this.EditemployeeForm.get('CardAddress')?.value;
this.employee.PhoneNo1  =this.EditemployeeForm.get('PhoneNo1')?.value;
this.employee.PhoneNoType1=this.EditemployeeForm.get('PhoneNoType1')?.value;
this.employee.PhoneNo2  =this.EditemployeeForm.get('PhoneNo2')?.value;
this.employee.PhoneNoType2=this.EditemployeeForm.get('PhoneNoType2')?.value;
this.employee.PhoneNo3  =this.EditemployeeForm.get('PhoneNo3')?.value;
this.employee.PhoneNoType3=this.EditemployeeForm.get('PhoneNoType3')?.value;
this.employee.Email = this.EditemployeeForm.get('Email')?.value;
this.employee.Website =this.EditemployeeForm.get('Website')?.value;
this.employee.Organization =this.data.ele.Organization;
this.employee.Title =this.data.ele.Title;
this.employee.Birthday =this.data.ele.Birthday;
this.employee.Note =this.data.ele.Note;

this.employee.Facebook =this.data.ele.Facebook;
this.employee.LinkedIn =this.data.ele.LinkedIn;
this.employee.Instgram =this.data.ele.Instgram;
this.employee.Snapchat=this.data.ele.Snapchat;
this.employee.Telegram =this.data.ele.Telegram;
this.employee.Youtube =this.data.ele.Youtube;
this.employee.Skype=this.data.ele.Skype;
this.employee.Tweeter=this.data.ele.Tweeter;
this.employee.Tiktok=this.data.ele.Tiktok;
this.employee.Maxtakatak =this.data.ele.Maxtakatak;
this.employee.WhatsApp=this.data.ele.WhatsApp;
    //   'Employeeid': this.EditemployeeForm.get("ID").value;
    //   'Employeename': this.EditemployeeForm.get('FirstName').value,
    //   'EmployeeLastname': this.EditemployeeForm.get('LastName').value,

     //};

    this.employeeService.Editemployee(this.employee).subscribe((data:any )=> {
      if(data!=null){
       
      this.event.emit('OK');
      this.dialogRef.close(data);
      }
    });

  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit() {
   // this.optype = this.data.optype;
   // alert(this.optype);
  }


}
