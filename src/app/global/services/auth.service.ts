import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  public roles: any = {};

  constructor () {
    const user = localStorage.getItem('user');

    if (user) {
      this.user = new User(JSON.parse(user));

      this.user.roles.map((role: string) => this.roles[role] = true);
    }
  }
}
