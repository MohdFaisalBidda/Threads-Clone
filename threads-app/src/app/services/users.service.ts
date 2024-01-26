import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from '../../../environment';
import { User } from '../../../interfaces/user.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http = inject(HttpClient);
  localStorageKey = "threads_user"

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  createUser(name: string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/users`, {
      name
    })
  }

  findUserByName(username: string, password: string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/users/login`, {
      username, password
    })
  }

  saveUsertoLocalStorage(user: User) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(user))
    }
  }

  removeUserFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.localStorageKey)
    }
  }

  getUserFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem(this.localStorageKey);
      return user ? JSON.parse(user) as User : null
    }
    return null;
  }
}
