import * as React from "react";
import {ITransaction} from "@/models/Transaction";
import {IWallet} from "@/models/Wallet";
import ITableBuilderStrategy from "@comp/TransactionTableView/AbstaractTableBuilderStrategy";


export default class SpendingTransactionsTableStrategy extends ITableBuilderStrategy {
    public buildHead(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element {
        return (
            <thead>
            <tr>
                <th><abbr title="Number">#</abbr></th>
                <th><abbr title="Value">Value</abbr></th>
                <th><abbr title="ID">ID</abbr></th>
                <th><abbr title="Name">Name</abbr></th>
                <th><abbr title="Date of creation">Created</abbr></th>
                <th><abbr title="Category">Category</abbr></th>
                <th><abbr title="Percent of all spendings">%</abbr></th>
                {
                    onDelete &&
                    <th><abbr title="Delete">Remove</abbr></th>
                }
            </tr>
            </thead>
        );
    }

    public buildFooter(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element {
        return (
            <tfoot>
            <tr>
                <th><abbr title="Number">#</abbr></th>
                <th><abbr title="Value">Value</abbr></th>
                <th><abbr title="ID">ID</abbr></th>
                <th><abbr title="Name">Name</abbr></th>
                <th><abbr title="Date of creation">Created</abbr></th>
                <th><abbr title="Category">Category</abbr></th>
                <th><abbr title="Percent of all gains">%</abbr></th>
                {
                    onDelete &&
                    <th><abbr title="Delete">Remove</abbr></th>
                }
            </tr>
            </tfoot>
        );
    }

    public buildBody(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): any {
        const absSp = 100 / Math.max(Math.abs(wallet.spending), 1);
        return (
            <tbody>
            {transactions.filter(x => (x as any).value <= 0).map((t: ITransaction, i) => {
                return (
                    <tr key={i}>
                        <th>{i}</th>
                        <td>{`${t.value} ${wallet.currency}`}</td>
                        <td>{t.id}</td>
                        <td>{t.name}</td>
                        <td>{new Date(t.created).toLocaleDateString()}</td>
                        <td>{t.category}</td>
                        <td>{`${(Math.abs(Number(t.value)) * absSp).toFixed(2)}%`}</td>
                        {
                            onDelete &&
                            <td>
                                <button className="button is-danger" onClick={onDelete(t)}>delete</button>
                            </td>
                        }
                    </tr>
                );
            })}
            </tbody>);
    }
}

