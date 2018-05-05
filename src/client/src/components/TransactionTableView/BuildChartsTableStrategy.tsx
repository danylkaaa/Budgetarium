import * as React from "react";
import {ITransaction} from "@/models/Transaction";
import {IWallet} from "@/models/Wallet";
import AbstaractTableBuilderStrategy from "@comp/TransactionTableView/AbstaractTableBuilderStrategy";

import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default class BuildChartsTableStrategy extends AbstaractTableBuilderStrategy {
    public buildPlot = (data: any) => {
        return (
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}
                           margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="created"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8"/>
                </AreaChart>
            </ResponsiveContainer>
        );
    }

    public buildHead(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element {
        return (
            <div>
                <p className={"title is-3"}> All transactions</p>
                {this.buildPlot(transactions)}
            </div>
        );
    }

    public buildFooter(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element {
        return (
            <div>
                <p className={"title is-3"}> All spellings</p>
                {this.buildPlot(transactions.filter(x => x.value <= 0))}
            </div>
        );
    }

    public buildBody(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): any {
        return (
            <div>
                <p className={"title is-3"}> All gains</p>
                {this.buildPlot(transactions.filter(x => x.value > 0))}
            </div>
        );
    }
}

