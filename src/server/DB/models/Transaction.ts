import * as mongoose from "mongoose";
import {Logger} from "@utils";
import {UserSchema} from "@DB/models/User";

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
export interface ITransaction extends mongoose.Document {
    wallet: mongoose.Types.ObjectId;
    creator: mongoose.Types.ObjectId;
    value: number;
    name: string;
    category: string;
}

export const TransactionSchema: mongoose.Schema = new mongoose.Schema({
    // stored in
    wallet: {type: mongoose.Types.ObjectId},
    // who create it
    creator: {type: mongoose.Types.ObjectId, required: true},
    // value of transaction
    value: {type: Number, required: true},
    // name of transaction
    name: String,
    // eq (movie, food etc.)
    category: String
}, {timestamps: true});
UserSchema.plugin(require("mongoose-paginate"));

