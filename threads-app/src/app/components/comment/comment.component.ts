import { CommonModule } from '@angular/common';
import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../../../interfaces/comments.interface';
import { CommentService } from '../../services/comment.service';

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
  commonService = inject(CommentService)
  nestedComments = signal<Comment[]>([]);

  nestedCommentsEffect = effect(() => {
    if (this.isExpanded()) {
      this.commonService.getComments(this.comment._id).subscribe(comments => {
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
  }
}
