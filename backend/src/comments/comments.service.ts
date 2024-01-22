import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema.ts';
import { Model, Types } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) { }

  create(createCommentDto: CreateCommentDto) {
    const createdComment = this.commentModel.create({
      text: createCommentDto.text,
      user: createCommentDto.userId,
      parent: createCommentDto.parentId || null
    })
    return createdComment.then((doc) => {
      return doc.populate(["user", "parent"])
    });
  }

  findAll() {
    return this.commentModel.find().populate(["user", "parent"]).exec();
  }

  findTopLevelComments() {
    return this.commentModel.find({
      parent: null
    }).populate(["user", "parent"]).exec();
  }

  findCommentsByParentId(parentId: string) {
    return this.commentModel.find({
      parent: parentId
    }).populate(["user", "parent"]).exec();
  }

  async findOne(id: string) {
    try {
      const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
      if (objectId) {
        const comment = await this.commentModel.findById(objectId).exec();
        if (comment) return comment;
        else {
          throw new NotFoundException(`comment with id ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid comment ID ${id}`)
      }
    } catch (error) {
      if (error instanceof HttpException) throw error
      else {
        throw new NotFoundException(`Failed to get the comment by ID ${id}`)
      }
    }
  }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  async remove(id: string) {
    try {
      const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null
      if (objectId) {
        const commentToDelete = await this.commentModel.findById(id);
        if (commentToDelete) {
          return await this.commentModel.findByIdAndDelete(objectId).exec();
        } else {
          throw new NotFoundException(`Comment with id ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid comment ID ${id}`)
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      else {
        throw new NotFoundException(`Failed to get the comment by ID ${id}`);
      }
    }
  }
}
