import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() queryParams) {
    try {
      if (queryParams.parentId) {
        return this.commentsService.findCommentsByParentId(queryParams.parentId)
      }
      return this.commentsService.findTopLevelComments();
    } catch (error) {
      return error
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
