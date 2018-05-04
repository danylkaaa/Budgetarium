import * as React from "react";
import {IWallet} from "@/models/Wallet";
import {Theme} from "material-ui";
import {IThemableProp} from "@/models/PropInterfaces";
import walletImage from "@/images/wallet.png";
import withWallets, {IWalletsProps} from "@hoc/withWallets";

interface IOwnProps {
    wallet: IWallet;
}

const styles = (theme: Theme) => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    actions: {
        display: "flex",
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: "auto",
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
});
type IProps = IOwnProps & IThemableProp<WalletView> & IWalletsProps;

class WalletView extends React.Component<IProps> {
    public render() {
        const {wallet}: any = this.props;
        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-128x128">
                            <img src={walletImage} alt="Image"/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p className="title is-3">{wallet.name}</p>
                            <p><strong>{wallet.owner.name}</strong></p>
                            <small>{new Date(wallet.created).toLocaleDateString()}</small>
                            <br/>
                        </div>
                    </div>
                </article>
                <div className="tile is-ancestor">
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-info">
                            <div className="title">Total</div>
                            <div className="subtitle">{wallet.total.toFixed(2)+wallet.currency}</div>
                        </article>
                    </div>
                    <div className="tile is-parent is-success">
                        <article className="tile is-child notification is-success">
                            <div className="title">Gain</div>
                            <div className="subtitle">{wallet.gain.toFixed(2)+wallet.currency}</div>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box notification is-danger">
                            <div className="title">Spending</div>
                            <div className="subtitle">{wallet.spending.toFixed(2)+wallet.currency}</div>
                        </article>
                    </div>
                </div>
            </div>
        );
    }
}

const Component = withWallets()(WalletView);
export default Component;