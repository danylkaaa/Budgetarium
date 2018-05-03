import AbstractDB from "./AbstractDB";
import {IWallet, IWalletProps, WalletModel} from "./models/Wallet";

class WalletDB extends AbstractDB<IWallet> {

    constructor() {
        super();
        this._model = WalletModel;
    }

    protected static _instance: WalletDB;

    public static getInstance(): WalletDB {
        if (!this._instance) {
            this._instance = new WalletDB();
        }
        return this._instance;
    }

    public create({owner, name, currency}: IWalletProps): Promise<IWallet> {
        return super.create({owner, name, currency});
    }

    public plainFields(): { [key: string]: any } {
        return {
            id: 1,
            gain: 1,
            spending: 1,
            name: 1,
            currency: 1,
        };
    }
}

export default WalletDB.getInstance();