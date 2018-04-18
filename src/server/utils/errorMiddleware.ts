import {Request, Response, NextFunction} from "express";

function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    return next(err);
}

export default errorMiddleware;