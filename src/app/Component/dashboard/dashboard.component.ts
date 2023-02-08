import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carddata } from 'src/app/model/carddata';
import { CardDataService } from 'src/app/services/card-data.service';
import { UserloginService } from 'src/app/services/userlogin.service';
import { EditMyContactComponent } from '../my-card-data/edit-my-contact/edit-my-contact.component';
import { EditMyDataComponent } from '../my-card-data/edit-my-data/edit-my-data.component';
import { EditMyProfileDetailComponent } from '../my-card-data/edit-my-profile-detail/edit-my-profile-detail.component';
import { EditMySocialmediaComponent } from '../my-card-data/edit-my-socialmedia/edit-my-socialmedia.component';
import { UploadProfilePicComponent } from '../my-card-data/upload-profile-pic/upload-profile-pic.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DatePipe]
  
})
export class DashboardComponent {
  EmployeeList: Carddata[];
  Emp: Carddata;
  isloading :boolean =true ; 

  constructor(private route : Router,private pipe : DatePipe ,private service : UserloginService,private empservice: CardDataService ,private matDialog: MatDialog , private toastr: ToastrService) { }
  ngOnInit(): void {
    // debugger ;

    let id: number = JSON.parse(localStorage.getItem('user')!).Data.CardHolderid;
    let uid: string = JSON.parse(localStorage.getItem('user')!).Data.UniqId;
    let token = JSON.parse(localStorage.getItem('user')!).Data.token;
    if(this.isTokenExpired(token))
    {
      this.service.logout();

    }else {

    this.GetMyCardData(id, uid);

    }

  }

  private isTokenExpired(token: string) :boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    // alert(expiry);

    // alert( this.pipe.transform(expiry *1000 , 'yyyy-MM-ddThh:mm:ssZZZZZ'))
    // alert( this.pipe.transform(Date.now() , 'yyyy-MM-ddThh:mm:ssZZZZZ'))
    // let c = Date.now()
    // alert(c)
    
    return ((expiry * 1000) < Date.now());
  }
  public GetMyCardData(id: number, uid: string) {
    this.empservice.GetCarddataListById(id, uid).subscribe((resp: any) => {
      if (resp != null) {
        this.isloading =false ; 
        this.EmployeeList= resp.Data as Carddata[];
        this.Emp = this.EmployeeList[0];
      }
    });
  }
  uploadProfile(row:any){
    let dialogRef = this.matDialog.open(UploadProfilePicComponent, {
      width: '950px',
      disableClose: true, hasBackdrop: true,
      data: { ele: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      let id: number = JSON.parse(localStorage.getItem('user')!).Data.CardHolderid;
      let uid: string = JSON.parse(localStorage.getItem('user')!).Data.UniqId;
      this.GetMyCardData(id, uid);
      if (result.Data.Data) {
        this.toastr.success(result.Data.Message, "Success:", {
          timeOut: 3000
        });
      } else {
        this.toastr.error(result.Data.Message, "Error:", {
          timeOut: 3000
        });
      }
    });
  }
  editSMPost(row: any  ) {
     
    let dialogRef = this.matDialog.open(EditMySocialmediaComponent, {
      width: '950px',
      disableClose: true, hasBackdrop: true,
      data: { ele: row  }
    });
    dialogRef.afterClosed().subscribe(result => {
      let id: number = JSON.parse(localStorage.getItem('user')!).Data.CardHolderid;
      let uid: string = JSON.parse(localStorage.getItem('user')!).Data.UniqId;
      this.GetMyCardData(id, uid);
      if (result.Data.Data) {
        this.toastr.success(result.Data.Message, "Success:", {
          timeOut: 3000
        });
      } else {
        this.toastr.error(result.Data.Message, "Error:", {
          timeOut: 3000
        });
      }
    });
  }
  editPDPost(row: any  ) {
    
    let dialogRef = this.matDialog.open(EditMyProfileDetailComponent, {
      width: '950px',
      disableClose: true, hasBackdrop: true,
      data: { ele: row  }
    });
    dialogRef.afterClosed().subscribe(result => {
      let id: number = JSON.parse(localStorage.getItem('user')!).Data.CardHolderid;
      let uid: string = JSON.parse(localStorage.getItem('user')!).Data.UniqId;
      this.GetMyCardData(id, uid);
      if (result.Data.Data) {
        this.toastr.success(result.Data.Message, "Success:", {
          timeOut: 3000
        });
      } else {
        this.toastr.error(result.Data.Message, "Error:", {
          timeOut: 3000
        });
      }
    });
  }
  editCDPost(row: any  ) {



    let dialogRef = this.matDialog.open(EditMyContactComponent, {
      width: '950px',
      disableClose: true, hasBackdrop: true,
      data: { ele: row  }
    });
    dialogRef.afterClosed().subscribe(result => {
      let id: number = JSON.parse(localStorage.getItem('user')!).Data.CardHolderid;
      let uid: string = JSON.parse(localStorage.getItem('user')!).Data.UniqId;
      this.GetMyCardData(id, uid);
      if (result.Data.Data) {
        this.toastr.success(result.Data.Message, "Success:", {
          timeOut: 3000
        });
      } else {
        this.toastr.error(result.Data.Message, "Error:", {
          timeOut: 3000
        });
      }
    });
  }
  logoutclick(){
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.route.navigate(['login']);
}
  UpdatePassword(row:any){
    let dialogRef = this.matDialog.open(ResetPasswordComponent, {
      width: '950px',
      disableClose: true, hasBackdrop: true,
      data: { ele: row }
    });
    dialogRef.afterClosed().subscribe(result => {
     // let id: number = JSON.parse(localStorage.getItem('user')!).Data.CardHolderid;
      //let uid: string = JSON.parse(localStorage.getItem('user')!).Data.UniqId;
      //this.GetMyCardData(id, uid);
      if (result.Data.Data==1 ) {
        this.toastr.success(result.Data.Message, "Success:", {
          timeOut: 3000
        }
        );
        this.logoutclick();
      } else {
        this.toastr.error(result.Data.Message, "Error:", {
          timeOut: 3000
        });
      }
    });
  }
}
