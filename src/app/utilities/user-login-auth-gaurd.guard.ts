import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import {UserloginService} from '../services/userlogin.service';
@Injectable({
  providedIn: 'root'
})
export class UserLoginAuthGaurdGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {

  constructor (private authservice : UserloginService , private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url :string =state.url;
     
      return this.checklogin(url);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canActivate(childRoute , state)
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  checklogin(url:string){
    if(this.authservice.isloggedin()){
      return true;
    }
    debugger;
    this.authservice.redirectURL =url ;
    this.router.navigate(['login'], {queryParams :{returnUrl:url}});
    return false;
  }
}
