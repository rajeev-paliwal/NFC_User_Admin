import {  EventEmitter, Inject, OnInit } from '@angular/core';
//import { BsModalRef } from 'ngx-bootstrap/modal';
import { CardDataService } from '../../../services/card-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MyCardDataComponent } from '../../../Component/my-card-data/my-card-data.component';
//import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-delete-my-data',
  templateUrl: './delete-my-data.component.html',
  styleUrls: ['./delete-my-data.component.css']
})
export class DeleteMyDataComponent implements OnInit {
 
  CardHolderId: number  ; //=this.bsModalRef.content.EMPId ;
  UniqueID: string  ;
  HolderName: string;
  event: EventEmitter<any> = new EventEmitter();
  
  constructor(private bsModalRef: MatDialogRef<MyCardDataComponent>, private crd_services: CardDataService,
    @Inject(MAT_DIALOG_DATA) public data:any ) {
           // alert ();
         //  this.HolderName  =data.ele.FirstName +' ' + data.ele.MiddleName  +' ' + data.ele.LastName;

  }

  deletePost(Data: any ) {
    //debugger ;
   this.HolderName  =Data.ele.FirstName +' ' + Data.ele.MiddleName  +' ' + Data.ele.LastName;
   this.CardHolderId = Data.ele.CardHolderid;
   this.UniqueID = Data.ele.UniqId;
    this.crd_services.DeleteCardData(this.CardHolderId , this.UniqueID).subscribe((res: any) =>{
      if(res!=null){

      }
      this.event.emit('OK');
      this.bsModalRef.close(res);
    });
    
   // this.bsModalRef.close();
  }

  onClose() { 
    this.bsModalRef.close();

  }
  ngOnInit() {
    this.HolderName  =this.data.ele.FirstName +' ' + this.data.ele.MiddleName  +' ' + this.data.ele.LastName;
   this.CardHolderId = this.data.ele.CardHolderid;
   this.UniqueID = this.data.ele.UniqId;
  }

}