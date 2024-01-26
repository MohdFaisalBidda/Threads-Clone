import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = "";

  constructor(private userService: UsersService, private router: Router) { }

  submitForm() {
    this.userService.createUser(this.username).subscribe((user) => {
      this.userService.saveUsertoLocalStorage(user);
      console.log(user);
      this.router.navigate(["/home"])
    },
      (error) => {
        console.log("User not found", error);
      }
    )
  }
}
