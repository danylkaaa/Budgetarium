import AbstractDB from "./AbstractDB";
import {ITransaction, ITransactionProps, TransactionModel} from "./models/Transaction";

class TransactionDB extends AbstractDB<ITransaction> {

    constructor() {
        super();
        this._model = TransactionModel;
    }

    protected static _instance: TransactionDB;

    public static getInstance(): TransactionDB {
        if (!this._instance) {
            this._instance = new TransactionDB();
        }
        return this._instance;
    }

    public create({walletId, creator, value, name, category}: ITransactionProps): Promise<ITransaction> {
        return super.create({walletId, creator, value, name, category});
    }

    public plainFields(): { [key: string]: any } {
        return {
            id: 1,
            value: 1,
            name: 1,
            category: 1
        };
    }

}

export default TransactionDB.getInstance();