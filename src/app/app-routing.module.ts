import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardHolerListComponent } from './Component/card-holer-list/card-holer-list.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { LoginComponent } from './Component/login/login.component';
import { MyCardDataComponent } from './Component/my-card-data/my-card-data.component';
import { UserLoginAuthGaurdGuard } from './utilities/user-login-auth-gaurd.guard';

const routes: Routes = [  { path: 'dashboard', component: DashboardComponent, canActivate: [UserLoginAuthGaurdGuard], },
// { path: 'carddata', component: CardHolerListComponent, canActivate: [UserLoginAuthGaurdGuard], },
{ path: 'mycarddata', component: MyCardDataComponent, canActivate: [UserLoginAuthGaurdGuard], },
{ path: 'login', component: LoginComponent },
{ path: '',   component:LoginComponent, pathMatch: 'full' },
{ path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to `first-component`
//{ path: '**', component: PaPageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
