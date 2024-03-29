const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    interface ITokenPayload {
      iat: number;
      exp: number;
      id: string;
    }
    if (!authHeader) {
      res.status(401);
      throw new Error("auth failed");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.SECRET_TOKEN,
      async (err: object | null, decoded: object | undefined) => {
        if (err) {
          res.status(401);
          throw new Error("jwt is not validated");
        } else {
          const { id } = decoded as ITokenPayload;

          next();
        }
      }
    );
  }
);

export default protect;
