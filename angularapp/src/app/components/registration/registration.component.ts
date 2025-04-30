import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

   registrationData:User = {
    Username:'',
    Email:'',
    Password:'',
    MobileNumber:'',
    UserRole:'',
    UserId:0 // Update to match expected backend field
  };
  // username: string = '';
  // email: string = '';
  // password: string = '';
   confirmPassword: string = '';
  // mobileNumber: string = '';
  // UserRole: string = '';

  passwordFieldType: string = 'password'; 
  confirmPasswordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onRegister() {
    if (this.registrationData.Password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

  

    console.log('Registration Data:', this.registrationData); // Debugging: Log the registration data
    console.log('Role Value:', this.registrationData.UserRole); // Debugging: Log the role value

    this.authService.register(this.registrationData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        
        // Show SweetAlert2 success message
        Swal.fire({
          title: 'Registration Successful',
          text: 'You have successfully registered!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        console.error('Registration failed', err);
        if (err.error && err.error.errors) {
          console.log('Validation Errors:', err.error.errors);
          alert(`Registration failed: ${JSON.stringify(err.error.errors)}`);
        } else {
          alert('Registration failed. Please check your input and try again.');
        }
      }
    });
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }
}
