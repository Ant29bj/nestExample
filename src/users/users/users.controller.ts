import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}
  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.userServices.createUser(newUser);
  }

  @Get()
  getAllusers() {
    return this.userServices.getAllUsers();
  }

  @Get(':id') //de se puede hacer parse si se quiere tener un tipo de dato
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userServices.getOneUser(id);
  }

  @Delete(':id')
  delteOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userServices.deleteUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userServices.updateUser(id, updateUser);
  }
  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    return this.userServices.createProfile(id, profile);
  }
}
