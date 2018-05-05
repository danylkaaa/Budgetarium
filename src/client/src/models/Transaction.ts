export interface ITransaction {
    name:string;
    id:string;
    value:string;
    currency:string;
    category:string;
    wallet:{
        id:string,
    };
    created:Date;
}