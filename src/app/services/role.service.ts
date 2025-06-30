import { Injectable } from '@angular/core';
import { Roles } from '../classes/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private userRoles: string[] = []; // Array to manage multiple roles

  constructor() {
    // Initialize roles from storage or other sources if needed
    const storedRoles = localStorage.getItem('userRole');
    if (storedRoles) {
      this.userRoles = JSON.parse(storedRoles);
    }
  }

  // Check if the user has a specific role
  hasRole(expectedRole: string): boolean {
    return this.userRoles.includes(expectedRole);
  }

  // Add a role to the user's roles
  addRole(role: string): void {
    if (!this.userRoles.includes(role)) {
      this.userRoles.push(role);
      this.saveRoles(); // Save roles to storage or other persistent storage
    }
  }

  // Remove a role from the user's roles
  removeRole(role: string): void {
    this.userRoles = this.userRoles.filter(r => r !== role);
    this.saveRoles(); // Save changes to storage or other persistent storage
  }

  // Set roles directly
  setRole(roles: string[]): void {
    this.userRoles = roles;
    this.saveRoles(); // Save roles to storage or other persistent storage
  }

  // Clear all roles
  clearRole(): void {
    this.userRoles = [];
    this.saveRoles(); // Clear roles from storage or other persistent storage
  }

  // Helper method to get user roles
  getUserRoles(): string[] {
    return this.userRoles;
  }

  // Helper method to save roles to storage
  private saveRoles(): void {
    localStorage.setItem('userRole', JSON.stringify(this.userRoles));
  }
}
