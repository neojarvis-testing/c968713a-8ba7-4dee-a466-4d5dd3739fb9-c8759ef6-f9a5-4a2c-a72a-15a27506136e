import { Component, OnInit } from '@angular/core';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn:'root'
})

@Component({
selector: 'app-registration',
templateUrl: './registration.component.html',
styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formSubmitted:boolean=false;
  
  registration:User={

    UserId :0,
   Email:'',
   Password:'',
   Username:'',
   MobileNumber:'',
   UserRole:''
  }
  confirmPassword:string='';
  isconfirm:boolean=false;

  constructor() { }
  constructor(private service:AuthService, private route:Router) { }
   passwordMatch()
   {
    if (this.registration.Password!=this.confirmPassword)
    {
      this.isconfirm=false;
      this.formSubmitted=false;
    }
    else
    this.isconfirm=true;
   }

  register()
  {
    this.formSubmitted=true;
    if(this.registration.UserId && this.registration.Email && this.registration.Password && this.registration.Username && this.registration.MobileNumber && this.registration.UserRole)
    {
       this.service.register(this.registration).subscribe(e=>{
              alert("Registration successfull");
              this.route.navigate(['/login']);
       });
      
    }

  }

  ngOnInit(): void {
  ngOnInit(): void 
  {
    
}

}