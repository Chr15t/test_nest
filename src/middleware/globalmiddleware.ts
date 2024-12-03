/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction , Request, Response} from "express";

@Injectable()
export class ValidationMiddleware implements NestMiddleware{

  // implement validation here 
    use(req: Request, _res: Response, next: NextFunction) {

        const method = req.method; 
        const url = req.originalUrl; 
        console.log(`METHOD ${method}, URL => ${url}`);
        next()
    }
    
}