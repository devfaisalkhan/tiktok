import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { User } from '../user.schema';
import { Model } from 'mongoose';
import { RegisterDTO } from '../user.dto';
import { IResponse } from 'src/universal/sahred.model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.model';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userRepo: Model<User>, 
        private jwtSvc: JwtService
        ) {
    }

    
    
    async register(user: RegisterDTO): Promise<IResponse> {
        const userExist = await this.findUserByUsername(user.username);
        
        if(userExist) 
            return {
                message: 'fail',
                status: HttpStatus.BAD_REQUEST
            };

        user.password = await argon.hash(user.password);
        await this.userRepo.create(user);
        
        return {
            status: HttpStatus.OK,
            message: 'success'
        };
    }

    async findUserByUsername(username: string) {
        const userExist =   await this.userRepo.findOne({username: username});
        
        if(userExist) return true;
        return false; 
    }

    async authenticate(user): Promise<IResponse> {
        const payload: JwtPayload = { username: user.username, id: user.id };
        return {
            message: 'success',
            status: HttpStatus.OK,
            data: {
                accessToken: this.jwtSvc.sign(payload)
            }
        }    
    }

    async validateUser(user) {
        const userExist = await this.userRepo.findOne({username: user.username});
        
        if(!userExist) return null;

        const matchPassword = await argon.verify(userExist.password, user.password);
        if(!matchPassword)  return null;

        return user;
    }
}
