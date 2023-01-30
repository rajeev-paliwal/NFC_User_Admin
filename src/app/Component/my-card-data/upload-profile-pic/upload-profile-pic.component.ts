import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cls_uploadpic } from 'src/app/model/carddata';
import { CardDataService } from 'src/app/services/card-data.service';
import { Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
@Component({
  selector: 'app-upload-profile-pic',
  templateUrl: './upload-profile-pic.component.html',
  styleUrls: ['./upload-profile-pic.component.css']
})
export class UploadProfilePicComponent implements OnInit  {
  base64 :string =''
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation?: number;
  translateH = 0;
  translateV = 0;
  scale = 1;
  aspectRatio = 1 / 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {
    translateUnit: 'px'
  };
  imageURL?: string;
  loading = false;
  allowMoveImage = false;
  hidden = false;

  fileChangeEvent(event: any): void {
    this.loading = false;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
    
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
    this.loading = false;
  }

  loadImageFailed() {
    console.error('Load image failed');
  }

  rotateLeft() {
    this.loading = false;
    setTimeout(() => { // Use timeout because rotating image is a heavy operation and will block the ui thread
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  rotateRight() {
    this.loading = false;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  moveLeft() {
    this.transform = {
      ...this.transform,
      translateH: ++this.translateH
    };
  }

  moveRight() {
    this.transform = {
      ...this.transform,
      translateH: --this.translateH
    };
  }

  moveTop() {
    this.transform = {
      ...this.transform,
      translateV: ++this.translateV
    };
  }

  moveBottom() {
    this.transform = {
      ...this.transform,
      translateV: --this.translateV
    };
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
    this.translateH = 0;
    this.translateV = 0;
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {
      translateUnit: 'px'
    };
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  toggleAspectRatio() {
    this.aspectRatio = this.aspectRatio === 4 / 3 ? 16 / 5 : 4 / 3;
  }
  ///////
  // imageChangedEvent: any = '';
  // croppedImage: any = '';
  
  CardHolderId: number  ; //=this.bsModalRef.content.EMPId ;
  UniqueID: string  ;
  HolderName: string;
  clsuploadpic : cls_uploadpic;
  imgFilePath :string ; 
  onClose() {
    this.dialogRef.close();
  }
  upload(){
    this.loading =true ; 
    console.log(this.uploadForm.value);
    this.clsuploadpic = new cls_uploadpic();
    this.clsuploadpic.CardHolderid = this.CardHolderId ;
    this.clsuploadpic.UniqId =this.UniqueID;
    this.clsuploadpic.fileext =this.uploadForm.value.file?.split('.')[1]==undefined ? '' :this.uploadForm.value.file?.split('.')[1] ;
    
    this.clsuploadpic.UserName =JSON.parse(localStorage.getItem('user')!).Data.token.split(":")[1];
    this.clsuploadpic.imagebytes =this.uploadForm.value.imgSrc?.split(',')[1]==undefined ?'': this.uploadForm.value.imgSrc?.split(',')[1];
    this.clsuploadpic.imagebytes = this.croppedImage?.split(',')[1]==undefined ?'': this.croppedImage?.split(',')[1];;
    this.service.UploadProfilePic(this.clsuploadpic).subscribe((result:any  )=>{
        if(result){
          this.event.emit('OK');
          this.dialogRef.close(result);
          this.loading =false ; 
        }

    }, error =>{
        this.loading =false ; 
    })
  }

  // upload(){
  //   console.log(this.uploadForm.value);
  //   this.clsuploadpic = new cls_uploadpic();
  //   this.clsuploadpic.CardHolderid = this.CardHolderId ;
  //   this.clsuploadpic.UniqId =this.UniqueID;
  //   this.clsuploadpic.fileext =this.uploadForm.value.file?.split('.')[1]==undefined ? '' :this.uploadForm.value.file?.split('.')[1] ;
    
  //   this.clsuploadpic.UserName =JSON.parse(localStorage.getItem('user')!).Data.token.split(":")[1];
  //   this.clsuploadpic.imagebytes =this.uploadForm.value.imgSrc?.split(',')[1]==undefined ?'': this.uploadForm.value.imgSrc?.split(',')[1];
  //   this.service.UploadProfilePic(this.clsuploadpic).subscribe((result:any)=>{
  //       if(result){
  //         this.event.emit('OK');
  //         this.dialogRef.close(result);
  //       }

  //   })
  // }
  event: EventEmitter<any> = new EventEmitter();
  imgFile: string;

   uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required])
  });
  
  constructor(private service:CardDataService,public dialogRef: MatDialogRef<UploadProfilePicComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }
  ngOnInit(): void {
    this.HolderName  =this.data.ele.FirstName +' ' + this.data.ele.MiddleName  +' ' + this.data.ele.LastName;
    this.CardHolderId = this.data.ele.CardHolderid;
    this.UniqueID = this.data.ele.UniqId;
    this.imgFile = this.data.ele.Photo;
  }
    
  get uf(){
    return this.uploadForm.controls;
  }
   
  onImageChange(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result as string
        });
   
      };
    }
  }
   
  // upload(){
  //   console.log(this.uploadForm.value);
  //   this.httpClient.post('http://localhost:8888/file-upload.php', this.uploadForm.value)
  //     .subscribe(response => {
  //       alert('Image has been uploaded.');
  //     })
  // }
}
