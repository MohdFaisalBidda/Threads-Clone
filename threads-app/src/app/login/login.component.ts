import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  loading: boolean = false;

  constructor(private userService: UsersService, private router: Router, private toastr: ToastrService) { }

  submitForm() {
    this.loading = true;
    this.userService.findUserByName(this.username, this.password).subscribe((user) => {
      this.userService.saveUsertoLocalStorage(user)
      console.log(user);
      this.router.navigate(["/"])
      this.toastr.success("Logged in Successfully!", "Success")
    },
      (error) => {
        console.log("User not found", error);
        this.toastr.error(error.error.message, "Error")
      }
    ).add(() => {
      this.loading = false;
    })
  }
}
