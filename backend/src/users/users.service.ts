import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema.ts';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userModel.findOne({ name: createUserDto.name }).exec();
      if (!userExists) {
        const userToSave = new this.userModel(createUserDto)
        return userToSave.save();
      } else {
        throw new BadRequestException("Username Already exists!")
      }
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(username: string) {
    try {
      if (username) {
        const user = await this.userModel.findOne({ name: username }).exec();
        if (user) {
          return user;
        } else {
          throw new NotFoundException(`Username with ${username} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid username`)
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new NotFoundException(`Failed to get the user by username ${username}`);
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
