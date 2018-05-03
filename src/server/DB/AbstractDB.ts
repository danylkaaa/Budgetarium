import {Document, PaginateOptions, PaginateResult, Query} from "mongoose";
import {IModel} from "@utils";

abstract class AbstractDB<T extends Document> {
    protected _model: IModel<T>;


    public abstract plainFields(): { [key: string]: any };

    public getPlainFields(doc: any) {
        return Object.keys(this.plainFields())
            .reduce((result: any, key: string) => {
                result[key] = doc[key];
                return result;
            }, {});
    }

    public get model(): IModel<T> {
        return this._model;
    }

    public find(query: any): Promise<T[]> {
        return this._model.find(query).exec();
    }

    public getFieldsById(id: any, fields: any): Promise<any> {
        return this._model.findById(id).select(fields).exec();
    }

    public getFields(query: any, fields: any): Promise<any> {
        return this._model.find(query).select(fields).exec();
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

    public create(args: any): Promise<T> {
        const instance = new this._model(args);
        return instance.save();
    }

    public async isUnused(args: any): Promise<boolean> {
        return (await this.findPaginated(args, {limit: 0})).total == 0;
    }

    public removeById(id: any): Promise<T> {
        return this._model.remove(id).exec();
    }

    public remove(query: any): Promise<T> {
        return this._model.remove(query).exec();
    }
}

export default AbstractDB;