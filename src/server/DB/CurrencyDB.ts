import AbstractDB from "./AbstractDB";
import {CurrencyModel, ICurrency, ICurrencyProps} from "@DB/models/Currencies";
import Logger from "../utils/logger";
import config from "@config";

const logger = Logger(module);

class CurrencyDB extends AbstractDB<ICurrency> {
    constructor() {
        super();
        this._model = CurrencyModel;
    }

    protected static _instance: CurrencyDB;

    public static getInstance(): CurrencyDB {
        if (!this._instance) {
            this._instance = new CurrencyDB();
        }
        return this._instance;
    }

    public getAllCC(): Promise<string[]> {
        return this.getFields({}, {cc: 1});
    }

    public async updateAll(newValues: ICurrencyProps[]): Promise<any> {
        const allowedCurrencies: string[] = config.get("ALLOWED_CURRENCIES");
        const filteredValues = newValues.filter(x => allowedCurrencies.find(v => v == x.cc));
        return Promise.all(filteredValues.map(c => this.updateRateOrCreate(c)));
    }

    public async updateRateOrCreate({txt, rate, cc}: ICurrencyProps): Promise<ICurrency> {
        try {
            let currency = await this.findOne({cc});
            if (currency) {
                if (currency.rate !== rate) {
                    currency.rate = rate;
                }
                currency.exchangedate = new Date();
                return currency.save();
            } else {
                return this.create({txt, rate, cc, exchangedate:new Date()});
            }
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    public create({txt, rate, cc, exchangedate}: ICurrencyProps): Promise<ICurrency> {
        return super.create({txt, rate, cc, exchangedate});
    }
    public plainFields(){
        return {
            cc:1,
            txt:1,
            rate:1,
            exchangedate:1
        };
    }
}

export default CurrencyDB.getInstance();