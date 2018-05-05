export interface ITransaction {
    name:string;
    id:string;
    value:number;
    currency:string;
    category:string;
    wallet:{
        id:string,
    };
    created:Date;
}