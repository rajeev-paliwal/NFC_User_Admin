import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private route : Router) { }
  ngOnInit(): void {
  }
  logoutclick(){
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          this.route.navigate(['login']);
  }
  test(){
    //alert("hello");
   }
}
