import Logger from "./logger";
import errorMiddleware from "./errorMiddleware";
import * as TokenGenerator from "./tokenGenerator";
import * as Projection from "./projection";
import mongoose from "mongoose";
export { TokenGenerator as TokenGenerator };
export { Logger as Logger };
export { errorMiddleware as errorMiddleware };
export { Projection as Projection }


export interface IModel<T extends mongoose.Document> extends mongoose.PaginateModel<T> { };

