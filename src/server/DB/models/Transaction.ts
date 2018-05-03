import * as mongoose from "mongoose";
import {IModel, Logger} from "@utils";

const logger = Logger(module);
/**
 * TYPES
 **/

/**
 * INTERFACES
 */


/**
 * Defines Transaction model
 */
export interface ITransactionProps {
     walletId: string;
    creator: string;
    value: number;
    name: string;
    category: string;
}
export interface ITransaction extends mongoose.Document,ITransactionProps {

}

export const TransactionSchema: mongoose.Schema = new mongoose.Schema({
    // stored in
    walletId: {type:String,required:true},
    // who create it
    creator: {type: String, required: true},
    // value of transaction
    value: {type: Number, required: true},
    // name of transaction
    name: String,
    // eq (movie, food etc.)
    category: String
}, {timestamps: true});
TransactionSchema.plugin(require("mongoose-paginate"));


TransactionSchema.plugin(require("mongoose-paginate"));
TransactionSchema.index({wallet: 1});
export const TransactionModel: IModel<ITransaction> = mongoose.model<ITransaction>("Transaction", TransactionSchema);


