import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/app/environments/environment'; // Import environment variables

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '', adminSecretKey: '' }; // Add secret key field
  passwordFieldType: string = 'password'; 

  constructor(private authService: AuthService, private router: Router) {}
 
  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        const role = this.authService.getUserRoleFromToken(response.token);
        console.log('Decoded Role:', role);
        localStorage.setItem('userRole', role);

        // Validate Secret Key for Admin Access
        console.log(environment.adminSecretKey);
        console.log(this.credentials.adminSecretKey);
        
        
        if (role === 'admin' && !this.credentials.adminSecretKey.includes(environment.adminSecretKey)) {
          Swal.fire({
            title: 'Access Denied!',
            text: 'Invalid Admin Secret Key. You are not authorized.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return; // Prevent navigation
        }

        // Navigate to the role-specific route
        if (role) {
          this.router.navigate([`/${role}`]); 
          Swal.fire({
            title: 'Success!',
            text: `Successfully logged in as ${role}`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Invalid Input!',
            text: 'No Inputs Found. Please enter valid credentials.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      error: () => {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid credentials. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      },
    });
  }
 
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
