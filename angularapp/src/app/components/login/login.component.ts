import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  passwordFieldType: string = 'password';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        const role = this.authService.getUserRoleFromToken(response.token);
        console.log('Decoded Role:', role);
        localStorage.setItem('userRole', role);
 
        // Navigate to the role-specific route
        if (role) {
          if (role=='admin') {
            this.router.navigate([`/${role}`]);
          }
          if (role=='user') {
             this.router.navigate([`/${role}`]);
          }
         // Convert role to lower case to match route paths
          Swal.fire({
            title: 'Success!',
            text: `Successfully logged in as ${role}`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Enter valid Input!',
            text: 'No Inputs Found Please enter Valid Inputs.',
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
          confirmButtonText: 'OK'});
      },
    });
  }
 
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
 