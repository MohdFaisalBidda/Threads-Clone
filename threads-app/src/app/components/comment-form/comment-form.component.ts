import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})

export class CommentFormComponent {
  @Input() placeholder = "Write Something..."
  @Input() btnText = "Create"
  @Output() formSubmitted = new EventEmitter<{ text: string }>();

  formSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const textAreaElement = form.elements.namedItem("commentText") as HTMLTextAreaElement;
    const commentText = textAreaElement.value;
    form.reset();
    console.log({ commentText });
    this.formSubmitted.emit({ text: commentText })
  }
}
