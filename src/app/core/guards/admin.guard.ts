import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  canActivate(next, state): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false), // <-- map to boolean
      tap(isAdmin => {
        if (!isAdmin) {
          this.toastr.error('Somente Administratores podem navegar para essa rota!');
        }
      })
    );
  }

}
