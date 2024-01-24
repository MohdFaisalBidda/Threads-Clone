import { Component, OnInit, inject, signal } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { CommentService } from '../services/comment.service';
import { Comment } from '../../../interfaces/comments.interface';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommentComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService)
  comments = signal<Comment[]>([]);
  username: string = '';
  constructor(private userService: UsersService) { }
  // userservice = inject(UsersService);

  ngOnInit(): void {
    const user = this.userService.getUserFromLocalStorage()
    if (!user) {
      this.userService.createUser(this.username)
    }
    this.fetchComments();
  }

  fetchComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments)
    })
  }
}
