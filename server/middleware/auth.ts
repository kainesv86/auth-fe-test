import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UserDto } from "../modules/user/dto";

declare global {
        namespace Express {
                interface Request {
                        user: UserDto;
                }
        }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies["x-auth-token"];

        if (!token) return res.status(401).send("Access denied. No token provided");

        try {
                const decoded = jwt.verify(token, process.env.jwtPrivateKey as Secret);
                req.user = decoded as UserDto;
                next();
        } catch (ex) {
                res.status(400).send("Invalid token.");
        }
};
