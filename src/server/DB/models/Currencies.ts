import * as mongoose from "mongoose";
import {IModel} from "@utils";

/**
 * TYPES
 **/

/**
 * INTERFACES
 */


/**
 * Defines Transaction model
 */

export interface ICurrencyProps {
    txt: string;
    rate: number;
    cc: string;
    exchangedate:Date;
}

export interface ICurrency extends mongoose.Document, ICurrencyProps {

}

export const CurrencySchema: mongoose.Schema = new mongoose.Schema({
    txt: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    cc: {
        type: String,
        required: true
    },
    exchangedate:Date
}, {timestamps: true});

CurrencySchema.plugin(require("mongoose-paginate"));
CurrencySchema.index({cc: 1});
/**
 * METHODS
 */
export const CurrencyModel: IModel<ICurrency> = mongoose.model<ICurrency>("Currency", CurrencySchema);