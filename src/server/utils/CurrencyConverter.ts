import {ICurrencyProps} from "@DB/models/Currencies";
import config from "@config";
import CurrencyDB from "@DB/CurrencyDB";
import * as _ from "lodash";
import Logger from "./logger";

const logger = Logger(module);

interface ICurrencyConverter {
    convert: (from: string, to: string, value: number) => number;
    setRates: (currencies: ICurrencyProps[]) => void;
    getRates: () => ICurrencyProps[];
}

class CurrencyConverter implements ICurrencyConverter {
    private _converter: any;
    private _updatedAt: Date;
    private _rates: ICurrencyProps[];

    public getRates(): ICurrencyProps[] {
        return this._rates;
    }

    public constructor(base: string) {
        this._converter = require("money");
        this._converter.base = base;
        this._updatedAt = new Date();
    }

    public setRates(currencies: ICurrencyProps[]) {
        this._rates = currencies;
        const ccs = currencies.map(x => x.cc);
        const values = currencies.map(x => x.rate);
        this._converter.rates = _.zipObject(ccs, values);
        this._updatedAt = new Date(currencies[0].exchangedate.getTime());
    }

    public isOutDated(): boolean {
        const outdatedAt = new Date(this._updatedAt.getTime() + Number(config.get("CURRENCY_UPDATE_TIMEOUT")));
        return outdatedAt >= new Date();
    }

    public convert(from: string, to: string, value: number): number {
        return this._converter.convert(value, {from, to}).toFixed(2);
    }
    public clone(){
        let newObj = new CurrencyConverter(config.get("CURRENCY_CONVERTATION_BASE"));
        newObj.setRates(this._rates);
        return newObj;
    }
}


class CurrencyConverterFactory {
    private static _instance: CurrencyConverterFactory = new CurrencyConverterFactory();
    private _proto: CurrencyConverter;

    public static getInstance() {
        return this._instance;
    }

    private constructor() {
        this._proto = new CurrencyConverter(config.get("CURRENCY_CONVERTATION_BASE"));
        CurrencyDB.find({})
            .then(c => this._proto.setRates(c))
            .catch(e => logger.error(e));
    }

    public async getConverter(): Promise<CurrencyConverter> {
        try {
            if (this._proto.isOutDated()) {
                this._proto.setRates(await CurrencyDB.find({}));
            }
            return this._proto.clone();
        } catch (err) {
            throw err;
        }
    }
}

export default CurrencyConverterFactory.getInstance();