import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router,private role_service:RoleService) { }
  ngOnInit(): void {
    this.role_service.clearRole();
    this.authService.removeToken();
    this.authService.changeAuthStatus(false);
    this.router.navigate(['/login']);
  }
}
