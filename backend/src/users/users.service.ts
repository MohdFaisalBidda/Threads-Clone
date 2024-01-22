import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema.ts';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  create(createUserDto: CreateUserDto) {
    try {
      const userToSave = new this.userModel(createUserDto)
      return userToSave.save();
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    try {
      const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
      if (objectId) {
        const user = await this.userModel.findById(objectId).exec();
        if (user) {
          return user;
        } else {
          throw new NotFoundException(`User with id ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid user ID ${id}`)
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new NotFoundException(`Failed to get the user by ID ${id}`);
      }
    }
  }

  async remove(id: string) {
    try {
      const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null
      if (objectId) {
        const userToDelete = await this.userModel.findById(id);
        if (userToDelete) {
          return await this.userModel.findByIdAndDelete(objectId).exec();
        } else {
          throw new NotFoundException(`user with id ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid user ID ${id}`)
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new NotFoundException(`Failed to get the user by ID ${id}`);
      }
    }
  }
}
