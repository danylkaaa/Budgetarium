import * as React from "react";
import {ITransaction} from "@/models/Transaction";
import {IWallet} from "@/models/Wallet";
import ITableBuilderStrategy from "@comp/TransactionTableView/AbstaractTableBuilderStrategy";
import * as _ from "lodash";

interface IOwnProps {
    transactions: ITransaction[];
    wallet: IWallet;
    strategy: ITableBuilderStrategy;
    onDelete?: (transaction: ITransaction) => any;
}

type IProps = IOwnProps;


class TransactionTableView extends React.Component<IProps> {
    public constructor(props: any) {
        super(props);
    }



    public render() {
        const {transactions, wallet, onDelete} = this.props;
        const splittedData = _.groupBy(_.sortBy(this.props.transactions, x => x.created), x => Math.sign(x.value as any));
        return (
            <div>
                {this.props.strategy.buildTable(transactions, wallet, onDelete)}
            </div>
        );
    }

}

const Component = TransactionTableView;

export default Component;