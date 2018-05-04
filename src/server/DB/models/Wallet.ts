import * as mongoose from "mongoose";
import {IModel, Logger} from "@utils";
import config from "@config";
import {ITransaction} from "@DB/models/Transaction";

const logger = Logger(module);
/**
 * TYPES
 **/

/**
 * INTERFACES
 */
type ITrasactionAffect = (t: ITransaction) => IWallet;


/**
 * Defines Transaction model
 */
export interface IWalletProps {
    owner: mongoose.Types.ObjectId;
    name: string;
    currency: string;

}

export interface IWallet extends mongoose.Document, IWalletProps {
    sharedWith: string[];
    spending: number;
    gain: number;
    addTransaction: ITrasactionAffect;
    removeTransaction:ITrasactionAffect;
}


export const WalletSchema: mongoose.Schema = new mongoose.Schema({
    // who create it
    owner: {type: String, required: true},
    // value of transaction
    sharedWith: {type: [String], default: []},
    // name of transaction
    name: String,
    // eq (movie, food etc.)
    currency: {
        type: String,
        enum: config.get("ALLOWED_CURRENCIES")
    },
    // sum of expenses of wallet
    spending: {
        type: Number,
        default: 0
    },
    // sum of gains of wallet
    gain: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

/**
 * METHODS
 */
WalletSchema.methods.addTransaction = function (t: ITransaction) {
    if (t.value >= 0) {
        this.gain += t.value;
    } else {
        this.spending += t.value;
    }
    return this.save();
};
WalletSchema.methods.removeTransaction = function (t: ITransaction) {
    if (t.value >= 0) {
        this.gain -= t.value;
    } else {
        this.spending -= t.value;
    }
    return this.save();
};

WalletSchema.plugin(require("mongoose-paginate"));
WalletSchema.index({owner: 1});
export const WalletModel: IModel<IWallet> = mongoose.model<IWallet>("Wallet", WalletSchema);
