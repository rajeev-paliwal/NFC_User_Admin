import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Scurity} from '../../model/security/scurity'
@Component({
  selector: 'app-leftnavigation',
  templateUrl: './leftnavigation.component.html',
  styleUrls: ['./leftnavigation.component.css']
})
export class LeftnavigationComponent implements OnInit , AfterViewInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  userName : string =''; 
PPIC :string ='';
  ngAfterViewInit(){
    var treeviewMenu = $('.app-menu');
    $('[data-toggle="sidebar"]').click(function(event) {
      //alert("Hello");
      event.preventDefault();
      $('.app').toggleClass('sidenav-toggled');
    });

    // Set initial active toggle
	$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

	//Activate bootstrip tooltips
//	$("[data-toggle='tooltip']").tooltip();

this.userName= JSON.parse( localStorage.getItem("user")!).Data.DisplayName;
  this.PPIC  =JSON.parse( localStorage.getItem("user")!).Data.Photo;
 // this.PPIC  =Scurity.GetProfilepic() ; //..parse( localStorage.getItem("user")!).Data.Photo;
 // alert(this.PPIC  =Scurity.GetProfilepic() ) ; 
  }
}
