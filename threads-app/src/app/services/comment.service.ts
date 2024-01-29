import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comment } from '../../../interfaces/comments.interface';

interface CreateCommentDto {
  parentId?:string,
  userId:string,
  text:string
}
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http = inject(HttpClient);

  getComments(parentId?: string) {
    let url = `${environment.apiBaseUrl}/comments`;
    if (parentId) {
      url += `?parentId=${parentId}`
    }
    return this.http.get<Comment[]>(url);
  }

  createComment(comment:CreateCommentDto){
    return this.http.post<Comment>(`${environment.apiBaseUrl}/comments`,comment)
  }
}
