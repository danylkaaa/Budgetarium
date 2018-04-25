/**
 * CHAIN OF RESPONSIBILITY
 */
import { ValidationErrorDescription } from "./ValidationError";
import * as _ from "lodash";
import {Logger} from "@utils";

const logger=Logger(module);
export interface IValidator {
    setHandler(path: string, handler: IValidator): void;
    validate(path: string | [string], value: any): Promise<ValidationErrorDescription>;
    validateByPath(path: string[], value: any): Promise<ValidationErrorDescription>;
}

export default abstract class AbstractValidator implements IValidator {
    protected _handlers: { [key: string]: AbstractValidator }={};

    public setHandler(path: string, handler: AbstractValidator): void {
        this._handlers[path] = handler;
    }
    public validate(path: string, value: any): Promise<ValidationErrorDescription> {
        return this.validateByPath(_.split(path, "."), value);
    }
    public validateByPath(path: string[], value: any): Promise<ValidationErrorDescription> {
        logger.debug(path.join(","));  
        logger.debug(JSON.stringify(this._handlers,null,3));                
        if (path[0] in this._handlers) {
            return this._handlers[path[0]].validateByPath(_.slice(path, 1), value);
        } else {
            return null;
        }
    }
}
