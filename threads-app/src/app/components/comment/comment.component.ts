import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../../../interfaces/comments.interface';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpanded = false;
  isReplying = false;

  toggleReply() {
    this.isReplying = !this.isReplying;
    if (this.isReplying) {
      this.isExpanded = !this.isExpanded
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
