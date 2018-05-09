import * as React from "react";
import {ITransaction} from "@/models/Transaction";
import {IWallet} from "@/models/Wallet";
import AbstaractTableBuilderStrategy from "@comp/TransactionTableView/AbstaractTableBuilderStrategy";
import * as _ from "lodash";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default class BuildChartsTableStrategy extends AbstaractTableBuilderStrategy {
    public buildPlot = (data: any, fill:string) => {
        return (
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}
                           margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="created"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="value" stroke={fill} fill={fill}/>
                </AreaChart>
            </ResponsiveContainer>
        );
    }

    public buildHead(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element {
        const totals=[{value:0, created:wallet.created}];
        _.sortBy(transactions,x=>x.created).forEach(x=>{
            totals.push(
                {
                    value:totals[totals.length-1].value+x.value,
                    created:x.created,
                }
            );
        });
        return (
            <div>
                <p className={"title is-3"}> All transactions</p>
                {this.buildPlot(totals,"#009cff")}
            </div>
        );
    }

    public buildFooter(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): JSX.Element {
        return (
            <div>
                <p className={"title is-3"}> All spellings</p>
                {this.buildPlot(transactions.filter(x => x.value <= 0).map(x=>({...x,value:-x.value})),"#d82200")}
            </div>
        );
    }

    public buildBody(transactions: ITransaction[], wallet: IWallet, onDelete?: (transaction: ITransaction) => any): any {
        return (
            <div>
                <p className={"title is-3"}> All gains</p>
                {this.buildPlot(transactions.filter(x => x.value > 0),"#00BD08")}
            </div>
        );
    }
}

