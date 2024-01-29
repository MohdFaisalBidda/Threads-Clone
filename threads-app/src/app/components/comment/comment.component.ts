import { CommonModule } from '@angular/common';
import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../../../interfaces/comments.interface';
import { CommentService } from '../../services/comment.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpanded = signal<boolean>(false);
  isReplying = signal<boolean>(false);
  commentService = inject(CommentService)
  userService = inject(UsersService)
  nestedComments = signal<Comment[]>([]);

  getuserName() {
    return `@${this.comment.user.username}`
  }

  nestedCommentsEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService.getComments(this.comment._id).subscribe(comments => {
        this.nestedComments.set(comments)
      })
    }
  })

  toggleReply() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpanded.set(!this.isExpanded)
    }
  }

  toggleExpand() {
    this.isExpanded.set(!this.isExpanded());
    console.log(this.isExpanded());
    
  }


  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromLocalStorage()
    if (!user) {
      return;
    }
    this.commentService.createComment({
      userId: user?._id, text,
      parentId: this.comment._id
    }).subscribe(createdComment => {
      this.nestedComments.set([createdComment, ...this.nestedComments()])
    });
  }

  commentTrackBy(_index: number, comment: Comment) {
    return comment._id
  }

}
