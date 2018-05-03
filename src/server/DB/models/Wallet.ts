import * as mongoose from "mongoose";
import {Logger} from "@utils";
import {UserSchema} from "@DB/models/User";
import config from "config";

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
export interface IWallet extends mongoose.Document {
    wallet: mongoose.Types.ObjectId;
    creator: mongoose.Types.ObjectId;
    value: number;
    name: string;
    category: string;
}

export const IWalletSchema: mongoose.Schema = new mongoose.Schema({
    // who create it
    owner: {type: mongoose.Types.ObjectId, required: true},
    // value of transaction
    sharedWith: {type: [mongoose.Types.ObjectId], default: []},
    // name of transaction
    name: String,
    // eq (movie, food etc.)
    currency: {
        type: String,
        enum: config.get("ALLOWED_CURRENCIES")
    }
}, {timestamps: true});
UserSchema.plugin(require("mongoose-paginate"));

