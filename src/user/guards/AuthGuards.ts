/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { User } from '../model/User.model';
import { Request } from 'express';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../interface/IUser";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    protected jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<IUser>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req)
    
    if (!token) throw new UnauthorizedException('Token is required');

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
    });

    const user = await this.userModel.findById(payload._id);

    if(!user) throw new UnauthorizedException('User not found');

    req['user'] = user;

    return true;
  }

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  
}