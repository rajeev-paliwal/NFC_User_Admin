import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { Carddata } from '../../model/carddata';
import { CardDataService } from '../../services/card-data.service';
import {  MatTableDataSource, } from '@angular/material/table';

import { ViewChild } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { EditMyDataComponent } from '../my-card-data/edit-my-data/edit-my-data.component';
import { DeleteMyDataComponent } from '../my-card-data/delete-my-data/delete-my-data.component';
import { DactiveMyDataComponent } from './dactive-my-data/dactive-my-data.component';
import { ActiveMyDataComponent } from './active-my-data/active-my-data.component';
import { ToastrService } from 'ngx-toastr';
import { UploadProfilePicComponent } from './upload-profile-pic/upload-profile-pic.component';


@Component({
  selector: 'app-my-card-data',
  templateUrl: './my-card-data.component.html',
  styleUrls: ['./my-card-data.component.css']
})
export class MyCardDataComponent implements OnInit, AfterViewInit {
  //bsModalRef: BsModalRef;
  title: string = "Card Holder"
  closeResult: string;
  EmployeeList: Carddata[];
  Emp: Carddata;
  Addop: string = "Hello";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private empservice: CardDataService
    , private cd: ChangeDetectorRef, private matDialog: MatDialog
    , private toastr: ToastrService

  ) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  dataSource: any;
  //displayedColumns: string[] = ['UniqId', 'FirstName', 'LastName', 'WebURlAddress','action'];
  displayedColumns: string[] = [ 'FirstName', 'LastName','action'];
  ngOnInit(): void {
    // debugger ;
    this.dataSource = new MatTableDataSource<Carddata>(this.EmployeeList);
    let id: number = JSON.parse(localStorage.getItem('user')!).Data.CardHolderid;
    let uid: string = JSON.parse(localStorage.getItem('user')!).Data.UniqId;
    this.GetMyCardData(id, uid);
  }
  public GetMyCardData(id: number, uid: string) {
    this.empservice.GetCarddataListById(id, uid).subscribe((resp: any) => {
      if (resp != null) {
        this.dataSource.data = resp.Data as Carddata[];
      }
    });
  }



  applyfilter(flitervalue: string) {
    this.dataSource.filter = flitervalue.trim().toLocaleLowerCase();
  }

  Selected_data: Carddata;
  logrowdata(row: any) {
       this.Selected_data = row;
   }

  addNewPost() {

  }

  deletePost(Data: any) {

    let DelDialog = this.matDialog.open(DeleteMyDataComponent, {
      width: '950px',
      disableClose: true, hasBackdrop: true,
      data: { ele: Data }
    });
    DelDialog.afterClosed().subscribe(result => {
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

  deActivePost(Data: any) {

    let DelDialog = this.matDialog.open(DactiveMyDataComponent, {
      width: '950px',
      disableClose: true, hasBackdrop: true,
      data: { ele: Data }
    });
    DelDialog.afterClosed().subscribe(result => {
      let id: number = JSON.parse(localStorage.getItem('user')!).Data.CardHolderid;
      let uid: string = JSON.parse(localStorage.getItem('user')!).Data.UniqId;
      this.GetMyCardData(id, uid);
      //alert("Hello");
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

  ActivePost(Data: any) {

    let DelDialog = this.matDialog.open(ActiveMyDataComponent, {
      width: '950px',
      disableClose: true, hasBackdrop: true,
      data: { ele: Data }
    });
    DelDialog.afterClosed().subscribe(result => {
      let id: number = JSON.parse(localStorage.getItem('user')!).Data.CardHolderid;
      let uid: string = JSON.parse(localStorage.getItem('user')!).Data.UniqId;
      this.GetMyCardData(id, uid);
      //alert("Hello");
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
  editPost(row: any) {



    let dialogRef = this.matDialog.open(EditMyDataComponent, {
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
}
