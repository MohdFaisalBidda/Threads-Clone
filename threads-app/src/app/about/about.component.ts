import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  constructor(private userService: UsersService) { }
  user: User | null = null;

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    console.log(this.user);
  }

}
