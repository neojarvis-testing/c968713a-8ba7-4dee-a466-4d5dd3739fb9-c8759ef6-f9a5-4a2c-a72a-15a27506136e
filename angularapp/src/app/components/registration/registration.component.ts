import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
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

  constructor(private service:AuthService, private route:Router) { }
  

  register()
  {
    this.formSubmitted=true;
    if(this.registration.UserId && this.registration.Email && this.registration.Password && this.registration.Username && this.registration.MobileNumber && this.registration.UserRole && this.registration.Password==this.confirmPassword)
    {
      this.isconfirm=true;
       this.service.register(this.registration).subscribe(e=>{
              alert("Registration successfull");
              console.log(e);
              
              this.route.navigate(['/login']);
       },e=>{
        console.log(e);
        
       });

    }

  }

  ngOnInit(): void 
  {

  }


}


