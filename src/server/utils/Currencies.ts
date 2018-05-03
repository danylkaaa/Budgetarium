import * as request from "request-promise";
import Logger from "./logger";
import {ICurrencyProps} from "@DB/models/Currencies";
import CurrencyDB from "@DB/CurrencyDB";

const logger = Logger(module);


export const currencyRateReqOptions = {
    url: "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    json: true,
    maxRedirects: 10
};

export function runRequestLoop(interval: number): any {
    return setInterval(updateCurrencyRate, interval);
}

export function updateCurrencyRate() {
    request(currencyRateReqOptions)
        .then((body: ICurrencyProps[]) => {
            logger.info(`Currencies has been received, total: ${body.length}`);
            body.forEach(x => x.rate = 1 / x.rate);
            return CurrencyDB.updateAll(body);
        }).then(c => {
        logger.debug(`Save ${c.length} currencies`);
    }).catch(err => {
        logger.error(err);
    });
}