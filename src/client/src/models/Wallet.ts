export interface IWallet {
    name: string;
    currency: string;
    gain: number;
    created:Date;
    spending: number;
    ownerId: string;
    owner:{
      name:string;
      id:string;
    };
    id: string;
    total: string;
}