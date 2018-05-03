import {
    AuthMiddleware,
    CurrencyConverterFactory,
    Logger,
    ValidationError,
    ValidationErrorDescription,
    Validator
} from "@utils";
import {IUser} from "@DB/models/User";
import {GraphQLError} from "graphql";
import * as lodash from "lodash";
import TransactionDB from "@DB/TransactionDB";
import WalletDB from "@DB/WalletDB";
import config from "@config";
import {ITransaction} from "@DB/models/Transaction";

const logger = Logger(module);

interface IContext {
    user: IUser;
}

interface ICreateMutation {
    name: string;
    currency?: string;
    category?: string;
    value: number;
    wallet: string;
}

export default {
    Mutation: {
        createTransaction: AuthMiddleware(["access"], async (__: any, data: ICreateMutation, context: IContext): Promise<any> => {
            try {
                let {name, currency, value, category, wallet} = data;
                name = name.trim();
                let errors: Array<ValidationErrorDescription> = await Promise
                    .all([
                        Validator.validate("transaction.currency", currency),
                        Validator.validate("transaction.wallet", wallet),
                        Validator.validate("transaction.category", category),
                        Validator.validate("transaction.name", name)
                    ]);
                errors = lodash.compact(errors);
                if (errors.length) throw new ValidationError(errors);
                currency = currency || config.get("CURRENCY_CONVERTATION_BASE");
                const walletContainer = await WalletDB.findById(wallet);
                if (walletContainer.owner != context.user.id) {
                    throw new GraphQLError("You do not have enough rights for this action");
                }
                // get actual converter
                const converter = await CurrencyConverterFactory.getConverter();
                // convert value to wallet currency
                value = Math.sign(value) * converter.convert(currency, walletContainer.currency, Math.abs(value));
                // create new transaction
                let transaction = await TransactionDB.create({
                    creator: context.user.id,
                    name: name,
                    value: value,
                    walletId: wallet,
                    category: category ? category : value > 0 ? "Gain" : "Spending",
                });
                // affect to wallet gain and processing
                await walletContainer.addTransaction(transaction);
                return TransactionDB.getPlainFields(transaction);
            } catch (e) {
                logger.error(e);
                throw new GraphQLError(e);
            }
        }),
    },
    Query: {},
    Transaction: {
        async wallet(data: ITransaction) {
            const walletId = (await TransactionDB.getFieldsById(data.id, {walletId: 1})).walletId;
            return {id: walletId};
        },
        async category(data: ITransaction) {
            return (await TransactionDB.getFieldsById(data.id, {category: 1})).category;
        },
        async value(data: ITransaction) {
            return (await TransactionDB.getFieldsById(data.id, {value: 1})).value;
        },
        async name(data: ITransaction) {
            return (await TransactionDB.getFieldsById(data.id, {name: 1})).name;
        },
        async creator(data: ITransaction) {
            return {
                id: (await TransactionDB.getFieldsById(data.id, {creator: 1})).creator
            };
        },
    }
};