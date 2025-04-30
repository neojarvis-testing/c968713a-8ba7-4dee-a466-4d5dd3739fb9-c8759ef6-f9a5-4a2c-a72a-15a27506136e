import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  logindto:Login={
   Email:'',
   Password:''
  }
  passwordFieldType: string = 'password'; 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.logindto).subscribe({
      next: (response: any) => {

        localStorage.setItem('token', response.token);
       
       const parsedToken = JSON.parse(response.token);
const role = parsedToken.role; // Extract role from parsed JSON
console.log('Decoded Role:', role);
localStorage.setItem('userRole', role);

        // Navigate to the role-specific route
        if (role) {
          if (role=='admin') {
            this.router.navigate([`${role}/adminnav`]); 
          }
          else if (role=='user') {
            this.router.navigate([`${role}/usernav`]); 

          }
          // Convert role to lower case to match route paths
          Swal.fire({
            title: 'Success!',
            text: `Successfully logged in as ${role}`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          console.log("error at logincomponent");
          this.router.navigate(['/error']); // Fallback route
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
