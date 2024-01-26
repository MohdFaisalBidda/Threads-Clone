import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";

  constructor(private userService: UsersService, private router: Router) { }

  submitForm() {
    this.userService.findUserByName(this.username).subscribe((user) => {
      this.userService.saveUsertoLocalStorage(user)
      console.log(user);
      this.router.navigate(["/"])
    },
      (error) => {
        console.log("User not found", error);

      }
    )
  }
}
