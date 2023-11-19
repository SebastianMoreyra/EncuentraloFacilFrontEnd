import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/auth-services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  // userRoles: string = ""

  constructor(
    private apiService: ApiService,
    private router: Router
    ) {

     }
    //  ngOnInit(): void {
    //   this.userRoles = this.apiService.getUserRoles();
    //   console.log("NavBar User Role : " + this.userRoles);
    // }

     logout(){
      this.apiService.logout()
      this.router.navigate(['auth/login']);
    }


}
