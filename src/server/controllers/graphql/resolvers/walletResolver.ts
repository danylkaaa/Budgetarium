import {AuthMiddleware, Logger, ValidationError, ValidationErrorDescription, Validator} from "@utils";
import {IUser} from "@DB/models/User";
import WalletDB from "@DB/WalletDB";
import {GraphQLError} from "graphql";
import TransactionDB from "@DB/TransactionDB";
import {IWallet} from "@DB/models/Wallet";
import config from "@config";
import * as lodash from "lodash";

const logger = Logger(module);

interface ICreateMutation {
    name: string;
    currency: string;
}

interface IContext {
    user: IUser;
}

interface IDeleteMutation {
    id: string;
}

interface IUpdateMutation {
    id: string;
    name?: string;
    currency: string;
}

interface IWalletsQuery {
    id?: string[];
    name?: string;
    currency?: string;
}

interface IWalletQuery {
    id: string;
}

export default {
    Mutation: {
        createWallet: AuthMiddleware(["access"], async (__: any, data: ICreateMutation, context: IContext): Promise<any> => {
            try {
                let {name, currency} = data;
                name = name.trim();
                let errors: Array<ValidationErrorDescription> = await Promise.all([Validator.validate("wallet.currency", currency), Validator.validate("wallet.name", name)]);
                errors = lodash.compact(errors);
                if (errors.length) throw new ValidationError(errors);
                let wallet = await WalletDB.create({
                    owner: context.user.id,
                    currency: currency || config.get("CURRENCY_CONVERTATION_BASE"),
                    name: name.trim()
                });
                return WalletDB.getPlainFields(wallet);
            } catch (e) {
                logger.error(e);
                throw new GraphQLError(e);
            }
        }),
        deleteWallet: AuthMiddleware(["access"], async (_: any, data: IDeleteMutation, context: IContext): Promise<boolean> => {
            try {
                let {id} = data;
                let wallet = await WalletDB.findById(id);
                if (!wallet) {
                    throw new GraphQLError("No such wallet found");
                }
                if (!wallet.owner == context.user.id) {
                    throw new GraphQLError("You are not owner of wallet");
                }
                await Promise.all([TransactionDB.remove({walletId: wallet.id}), WalletDB.removeById(id)]);
                return true;
            } catch (e) {
                logger.error(e);
                throw new GraphQLError(e);
            }
        }),
    },
    Query: {
        wallets: AuthMiddleware(["access"], async (_: any, data: IWalletsQuery, context: IContext): Promise<IWallet[]> => {
            try {
                let {id, name, currency} = data;
                const query: any = WalletDB.buildSearchQuery(data);
                query.owner = context.user.id;
                logger.info(query);
                return await WalletDB.getFields(query, WalletDB.plainFields());
            } catch (e) {
                logger.error(e);
                throw new GraphQLError(e);
            }
        }),
        wallet: AuthMiddleware(["access"], async (_: any, data: IWalletQuery, context: IContext): Promise<IWallet> => {
            try {
                let {id} = data;
                return await WalletDB.getFields(id, WalletDB.plainFields());
            } catch (e) {
                logger.error(e);
                throw new GraphQLError(e);
            }
        }),
    },
    Wallet: {
        async spending(data: IWallet) {
            return (await WalletDB.getFieldsById(data.id, {spending: 1})).spending;
        },
        async gain(data: IWallet) {
            return (await WalletDB.getFieldsById(data.id, {gain: 1})).gain;
        },
        async name(data: IWallet) {
            return (await WalletDB.getFieldsById(data.id, {name: 1})).name;
        },
        async total(data: IWallet) {
            logger.info("total wallet" + data);
            if (data.gain && data.spending) {
                return data.gain + data.spending;
            } else {
                const fields = await WalletDB.getFieldsById(data.id, {gain: 1, spending: 1});
                return fields.gain + fields.spending;
            }
        },
        async sharedWith(data: IWallet) {
            logger.info("sharedWith wallet" + data);
            return (await WalletDB.getFieldsById(data.id, {sharedWith: 1}))
                .map((id: any) => ({id}));
        },
        async transactions(data: IWallet) {
            logger.info("transactions wallet" + data);
            return (await WalletDB.getFieldsById(data.id, {transactions: 1}))
                .map((id: any) => ({id}));
        }
    }
};