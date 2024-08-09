import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from'bcrypt'
import {LoginDto} from './dto/login.dto'
import {RegisterDto} from './dto/register.dto'
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../db/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

  
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signIn(LoginDto: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = LoginDto;
    const user = await this.userModel.findOne({ $or: [
        { username: username },
        { email: username }
    ]})

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong Password, please input right password');
    }

    const payload = { id:user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { username, email, password } = registerDto;
    const existingUser = await this.userModel.findOne({ username });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return { message: 'User registered successfully' };
  }
}
