import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formSubmitted: boolean = false;
  
  registration: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };

  confirmPassword: string = '';
  isconfirm: boolean = false;
  error: string = '';
  passwordError: string = '';

  constructor(private service: AuthService, private route: Router) { }

  
  passwordMatch() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/;

    if (!passwordRegex.test(this.registration.Password)) {
      this.passwordError = "*Password must have at least one uppercase, one lowercase, one digit, and one special character.";
      this.isconfirm = false;
      return;
    } else {
      this.passwordError = ''; 
    }

    if (this.registration.Password !== this.confirmPassword) {
      this.isconfirm = false;
      this.error = "*Passwords do not match";
    } else {
      this.isconfirm = true;
      this.error = ''; 
    }
  }


  register() {
    this.formSubmitted = true;

   
    this.passwordMatch();
    if (!this.isconfirm) {
      alert("Passwords do not match.");
      return; 
    }

    if (this.passwordError) {
      alert(this.passwordError);
      return;
    }

    if (this.registration.UserId && this.registration.Email && this.registration.Password &&
        this.registration.Username && this.registration.MobileNumber && this.registration.UserRole) {

        this.service.register(this.registration).subscribe({
            next: () => {
                alert("Registration successful");
                this.route.navigate(['/login']); 
            },
            error: (err) => {
                alert("Registration failed: " + err.message);
            }
        });
    }
  }

  ngOnInit(): void { }
}
