import { Request, Response, NextFunction } from "express";

export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    return next(err);
}
