import Logger from "./logger";
import mongoose from "mongoose";

export { default as GraphQLValidator } from "./GraphQLValidator";
export { default as TokenGenerator } from "./tokenGenerator";
export { default as errorMiddleware } from "./errorMiddleware";


export { default as Projection } from "./projection";
export { default as ValidationErorr } from "./ValidationError";
export { ValidationErrorDescription } from "./ValidationError";

export interface IModel<T extends mongoose.Document> extends mongoose.PaginateModel<T> { };

