import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const now = new Date();
        const formattedDate = now.toLocaleString();
        console.log(`[${formattedDate}] Estas ejecutando un método ${req.method} en la ruta ${req.url}`);
        next();
    }
}

export function loggerGlobal (req: Request, res: Response, next: NextFunction){
    const now = new Date();
    const formattedDate = now.toLocaleString();
    console.log(`[${formattedDate}]Estas ejecutando un método ${req.method} en la ruta ${req.url}`);
    next();
}