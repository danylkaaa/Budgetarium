import { Router, Request, Response, NextFunction } from "express";
import * as express from "express";
import APIController from "./api/graphQL.controller";
import { Logger, errorMiddleware } from "@utils";
import config from "@config";
import path from "path";

const logs = Logger(module);
const router: Router = express.Router();

function error404(req: Request, res: Response, next: NextFunction): void {
    logs.debug("Not found URL: %s", req.url);
    const err: any = new Error("Not found");
    err.status = 404;
    next(err);
}

function onError(err: any, req: Request, res: Response): void {
    logs.error("Internal error(%d): %s", res.statusCode, err.message);
    res.locals.message = err.message;
    res.locals.error = config.get("isDev") ? err : {};
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message || "Server error",
    });
}

function onSPA(req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, "../public/index.html"));
}

router.use("/api", APIController);
router.use("*", onSPA);
router.use(error404);
router.use(errorMiddleware, onError);

export default router;