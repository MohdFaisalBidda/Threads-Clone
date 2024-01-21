import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema.ts';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) { }

  create(createCommentDto: CreateCommentDto) {
    const createdCommet = this.commentModel.create({
      text: createCommentDto.text,
      user: createCommentDto.userId,
      parent: createCommentDto.parentId || null
    })
    return createdCommet.then((doc) => {
      return doc.populate(["user", "parent"])
    });
  }

  findAll() {
    return this.commentModel.find().populate(["user", "parent"]).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
