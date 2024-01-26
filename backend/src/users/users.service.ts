import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema.ts';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) { }

  async register(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userModel.findOne({ username: createUserDto.username }).exec();
      if (!userExists) {
        const hashedPass = await bcrypt.hash(createUserDto.password, 10);
        const userToSave = await this.userModel.create({ username: createUserDto.username, password: hashedPass.toString() })
        return userToSave;
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

  async login(loginUserDto: CreateUserDto) {
    try {
      if (loginUserDto.username) {
        const user = await this.userModel.findOne({ username: loginUserDto.username }).exec();
        if (user) {
          const decrpytedPass = await bcrypt.compare(loginUserDto.password, user.password);
          if (decrpytedPass) {
            return user;
          } else {
            throw new NotFoundException("Password is incorrect")
          }
        } else {
          throw new NotFoundException(`${loginUserDto.username} username not found`);
        }
      } else {
        throw new BadRequestException(`Invalid username`)
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new NotFoundException(`Failed to get the user by username ${loginUserDto.username}`);
      }
    }
  }

  // async findOne(username: string) {
  //   try {
  //     if (username) {
  //       const user = await this.userModel.findOne({ username: username }).exec();
  //       if (user) {
  //         return user;
  //       } else {
  //         throw new NotFoundException(`${username} username not found`);
  //       }
  //     } else {
  //       throw new BadRequestException(`Invalid username`)
  //     }
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     } else {
  //       throw new NotFoundException(`Failed to get the user by username ${username}`);
  //     }
  //   }
  // }

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
