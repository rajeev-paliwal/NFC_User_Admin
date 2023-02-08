import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftnavigationComponent } from '../app/Component/leftnavigation/leftnavigation.component';
import { HeaderComponent } from '../app/Component/header/header.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { LoginComponent } from './Component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserloginService } from './services/userlogin.service';
import { ToastrModule } from 'ngx-toastr';
import { Scurity } from './model/security/scurity';
import { CardHolerListComponent } from './Component/card-holer-list/card-holer-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeadersInterceptor } from './utilities/headers.interceptor';
import { ForgetpasswordComponent } from './Component/forgetpassword/forgetpassword.component';
import { MyCardDataComponent } from './Component/my-card-data/my-card-data.component';
import { EditMyDataComponent } from './Component/my-card-data/edit-my-data/edit-my-data.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteMyDataComponent } from '../app/Component/my-card-data/delete-my-data/delete-my-data.component';
import { ActiveMyDataComponent } from './Component/my-card-data/active-my-data/active-my-data.component';
import { DactiveMyDataComponent } from './Component/my-card-data/dactive-my-data/dactive-my-data.component';
import { UploadProfilePicComponent } from './Component/my-card-data/upload-profile-pic/upload-profile-pic.component';
import { MatSelectModule } from '@angular/material/select';
import { EditMySocialmediaComponent } from './Component/my-card-data/edit-my-socialmedia/edit-my-socialmedia.component';
import { EditMyContactComponent } from './Component/my-card-data/edit-my-contact/edit-my-contact.component';
import { EditMyProfileDetailComponent } from './Component/my-card-data/edit-my-profile-detail/edit-my-profile-detail.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';
@NgModule({
  declarations: [
    AppComponent,
    LeftnavigationComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    CardHolerListComponent,
    ForgetpasswordComponent,
    MyCardDataComponent,
    EditMyDataComponent,
    DeleteMyDataComponent,
    ActiveMyDataComponent,
    DactiveMyDataComponent,
    UploadProfilePicComponent,
    EditMySocialmediaComponent,
    EditMyContactComponent,
    EditMyProfileDetailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule ,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ImageCropperModule,
    
    
  ],
  providers: [UserloginService,Scurity,HeadersInterceptor ,
     {
    provide:HTTP_INTERCEPTORS,
    useClass:HeadersInterceptor,
    multi:true
  } ,{ provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
