import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [UsersModule, CommentsModule, MongooseModule.forRoot("mongodb+srv://threads-clone:2QcIKfnKYlQX13Rm@cluster0.6u2l6tl.mongodb.net/threads?retryWrites=true&w=majority")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
