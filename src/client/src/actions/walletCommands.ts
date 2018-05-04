import {IAction} from "@/actions/actionTypes";
import {IState, IWalletsState} from "@/models/State";
import {addError, endLoading, startLoading} from "@/actions/appArgs";
import * as Redux from "redux";
import {IWalletsGetQueryVars, WALLETS_GET_QUERY} from "@/graphql/mutations/wallet";
import {clientAccess} from "@/graphql";
import {walletsLoadSuccess} from "@/actions/walletArgs";

abstract class WalletCommand extends IAction<IWalletsState> {
    protected fetchFailed: WalletFetchFailedCommand;

    public constructor() {
        super();
        this.fetchFailed = new WalletFetchFailedCommand();
    }
}

//
// export class CreateWalletCommand extends WalletCommand {
//     public execute(data: IWalletCreateMutationVars) {
//         return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
//             dispatch(startLoading("wallet"));
//             const mutation = WALLET_CREATE_MUTATION;
//             const variables = data;
//             clientAccess.mutate({mutation, variables})
//                 .then(response => {
//                     if (!response.data) {
//                         throw Error("Server returns empty response");
//                     } else {
//                         const w = (response.data as IWalletCreateMutationResponse);
//                         const wallet = {
//                             ...w,
//                             ownerId: (w.owner.id as string)
//                         };
//                         dispatch(walletCreationSuccess(wallet as any));
//                     }
//                 })
//                 .catch((err: any) => {
//                         console.log(JSON.stringify(err, null));
//                         if (err.graphQLErrors) {
//                             err.graphQLErrors.forEach((e: any) => dispatch(this.fetchFailed.execute(e.message)));
//                         } else {
//                             dispatch(this.fetchFailed.execute(err.message));
//                         }
//                     }
//                 );
//         };
//     }
// }

export class LoadWalletsCommand extends WalletCommand {
    public execute(queryData: IWalletsGetQueryVars) {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(startLoading("wallets"));
            const query = WALLETS_GET_QUERY;
            const variables=queryData;
            console.log(queryData,"query");
            clientAccess.query({query, variables})
                .then(response => {
                    console.log(response);
                    const answer=response.data as any;
                    clientAccess.cache.reset();
                    if (!answer|| ! answer.wallets) {
                        throw Error("Server returns empty response");
                    } else {
                        dispatch(endLoading("wallets"));
                        dispatch(walletsLoadSuccess(answer.wallets as any));
                    }
                })
                .catch((err: any) => {

                        if (err.graphQLErrors&& err.graphQLErrors.length) {
                            err.graphQLErrors.forEach((e: any) => dispatch(this.fetchFailed.execute(e.message)));
                        } else {
                            dispatch(this.fetchFailed.execute(err.message));
                        }
                    }
                );
        };
    }
}


// end fetching data end show error message
class WalletFetchFailedCommand extends IAction<IState> {
    public execute(message: string, scope = "wallets") {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(endLoading(scope));
            console.log(message);
            if (message) {
                dispatch(addError(scope, message));
            } else {
                dispatch(addError(scope, "Some error"));
            }
        };
    }
}

