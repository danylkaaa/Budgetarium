import { Document, Query, PaginateOptions, PaginateModel, PaginateResult } from "mongoose";
import { IModel } from "@utils";

abstract class AbstractDB<T extends Document>{
    protected _model: IModel<T>;

    public get model(): IModel<T> {
        return this._model;
    }
    public findOne(query: any): Promise<T> {
        return this._model.findOne(query).exec();
    }
    public findPaginated(query: Query<T>, pagination: PaginateOptions): Promise<PaginateResult<T>> {
        return this._model.paginate(query, pagination);
    }
    public findById(id: any): Promise<T> {
        return this._model.findById(id).exec();
    }
    public async size(): Promise<number> {
        return this._model.count({}).exec();
    }
}

export default AbstractDB;