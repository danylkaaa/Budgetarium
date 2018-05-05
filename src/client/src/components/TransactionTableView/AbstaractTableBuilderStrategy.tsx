import {ITransaction} from "@/models/Transaction";
import {IWallet} from "@/models/Wallet";
import * as React from "react";

export default abstract class AbstaractTableBuilderStrategy {
    public abstract buildHead(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element;

    public abstract buildFooter(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element;

    public abstract buildBody(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element;

    public buildTable(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element {
        return (
            <table className="table is-fullwidth">
                {this.buildHead(transactions, wallet, onDelete)}
                {this.buildBody(transactions, wallet, onDelete)}
                {this.buildFooter(transactions, wallet, onDelete)}
            </table>
        );
    }
}