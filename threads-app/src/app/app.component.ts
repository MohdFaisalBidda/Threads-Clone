import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'threads-app';
 
  username: string = '';
  constructor(private userService: UsersService) { }
  // userservice = inject(UsersService);

  ngOnInit(): void {
    const user = this.userService.getUserFromLocalStorage()
    if (!user) {
      this.userService.createUser(this.username)
    }
  }

  // constructor() {
  //   const user = this.userservice.getUserFromLocalStorage()
  //   if (!user) {
  //     this.userservice.createUser(this.username)
  //   }
  // }
}
