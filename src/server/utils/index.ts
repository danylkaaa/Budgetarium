import mongoose from "mongoose";
import * as Currencies from "./Currencies";

export {default as TokenGenerator} from "./tokenGenerator";
export {default as errorMiddleware} from "./errorMiddleware";

export {default as Logger} from "./logger";
export {default as Projection} from "./projection";
export {ValidationErrorDescription, default as ValidationError} from "./validators/ValidationError";
export {default as AbstractValidator} from "./validators/AbstractValidator";
export {default as Validator} from "./validators/RootValidator";
export {default as AuthMiddleware} from "./AuthMiddleware";

export {Currencies};
export {default as CurrencyConverterFactory} from "./CurrencyConverter";


export interface IModel<T extends mongoose.Document> extends mongoose.PaginateModel<T> {
}
