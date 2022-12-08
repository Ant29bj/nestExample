import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from 'src/users/dto/create-profile.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entity/user.entity';
import { Profile } from 'src/users/entity/profile.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async createUser(user: CreateUserDto) {
    const exist = await this.userRepo.findOne({
      where: {
        username: user.username,
      },
    });
    if (exist) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  getAllUsers() {
    return this.userRepo.find();
  }

  async getOneUser(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      console.log('no entro');
      return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return this.userRepo.delete({ id: id });
  }

  async updateUser(id: number, updatedUser: UpdateUserDto) {
    const result = await this.userRepo.update({ id }, updatedUser);
    if (result.affected === 0) {
      return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async createProfile(id: number, profile: CreateProfileDto) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newProfile = this.profileRepo.create(profile);
    const savedProfile = await this.profileRepo.save(newProfile);

    user.profile = savedProfile;

    return this.userRepo.save(user);
  }
}
