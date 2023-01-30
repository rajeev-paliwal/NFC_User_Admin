import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort'
import {MatPaginator} from '@angular/material/paginator';
import { Carddata } from '../../model/carddata';
import { CardDataService } from '../../services/card-data.service';
import { MatNoDataRow, MatTableDataSource , } from '@angular/material/table';
import { NgbModal ,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';

//import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
// import { AddNewPostComponent } from './add-new-post/add-new-post.component';
// import { DeletePostComponent } from './delete-post/delete-post.component';
// import { EditPostComponent } from './edit-post/edit-post.component';

@Component({
  selector: 'app-card-holer-list',
  templateUrl: './card-holer-list.component.html',
  styleUrls: ['./card-holer-list.component.css']
})
export class CardHolerListComponent implements OnInit ,AfterViewInit {
  //bsModalRef: BsModalRef;
  title :string = "Card Holder"
  closeResult: string;
  EmployeeList : Carddata[];
  Emp :Carddata;
 Addop :string ="Hello" ; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort :MatSort;

  constructor(private empservice : CardDataService
   ,private cd: ChangeDetectorRef
   // , private bsModalService: BsModalService
    ) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  dataSource : any ;
  displayedColumns: string[] = ['UniqId', 'FirstName', 'LastName', 'action' ];
 
  ngOnInit(): void {
   // debugger ;
    this.dataSource = new MatTableDataSource<Carddata>(this.EmployeeList);
    this.getallemployee();
  }
  public getallemployee(){
    // let resp = this.empservice.getAllEmployee();
   // resp.subscribe(report =>this.dataSource.data =report as Carddata[]);

     this.empservice.getAllEmployee().subscribe((resp :any)=> {
      if(resp!=null){
       //  x = resp ;//as Carddata[];

      //  this.dataSource.data =x.Data as Carddata[];
      this.dataSource.data =resp.Data as Carddata[];
      }
     });
   

  }
 
 
 
  applyfilter(flitervalue :string ){

    this.dataSource.filter = flitervalue.trim().toLocaleLowerCase();
  }

    Selected_data :Carddata;
    logrowdata(row:any){
     // console.log(row);
      this.Selected_data =row ; 
     // console.log(this.Selected_data);
    }

    addNewPost() {
      // this.bsModalRef = this.bsModalService.show(AddNewPostComponent);
      // this.bsModalRef.content.event.subscribe(result => {
      //   if (result == 'OK') {
      //    // debugger ;
      //     this.getallemployee();
      //   }
      // });
    }

    deletePost(EmpId: number, EMPName: string) {
      
      // this.bsModalRef = this.bsModalService.show(DeletePostComponent);
      // this.bsModalRef.content.EMPId = EmpId;
      // this.bsModalRef.content.EMPName = EMPName;
      // this.bsModalRef.content.event.subscribe(result => {
      //   console.log("deleted", result);
      //   if (result == 'OK') {
      //     setTimeout(() => {
      //       this.EmployeeList=[];
      //       this.getallemployee();
      //     }, 2000);
      //   }
      // });
    }
  
    
    editPost(postId: number) {
      // this.empservice.changePostId(postId);
  
      // this.bsModalRef = this.bsModalService.show(EditPostComponent);
      // this.bsModalRef.content.event.subscribe(result => {
      //   if (result == 'OK') {
      //     setTimeout(() => {
      //       this.getallemployee();
      //     }, 5000);
      //   }
      // });
    }
}
