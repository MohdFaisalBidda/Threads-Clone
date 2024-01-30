import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = "";
  password: string = "";

  constructor(private userService: UsersService, private router: Router, private toastr: ToastrService) { }

  submitForm() {
    this.userService.createUser(this.username, this.password).subscribe((user) => {
      this.userService.saveUsertoLocalStorage(user);
      console.log(user);
      this.router.navigate(["/home"]);
      this.toastr.success("Register Successfully!", "Success")
    },
      (error) => {
        console.log("User not found", error);
        this.toastr.error(error.error.message, "Error")
      }
    )
  }
}
