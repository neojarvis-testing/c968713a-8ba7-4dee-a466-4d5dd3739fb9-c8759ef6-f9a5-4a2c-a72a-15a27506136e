import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("arrive at authguard");
 
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getUserRole();
 
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
 
    // Extract required role from route data
    const requiredRole = route.data['role'] as string;
    console.log(userRole);
 
    // if (requiredRole && userRole !== requiredRole) {
    //   console.log("error at authguard - insufficient role");
    //   this.router.navigate[`/${requiredRole}`];
    //   return false;
    // } else {
    //   this.router.navigate['/home'];
    //   return true;
    // }
 
    return true;
  }
}