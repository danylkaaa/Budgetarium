import AbstractDB from "./AbstractDB";
import { IUser, IPayload, UserModel } from "./models/User";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

class UserDB extends AbstractDB<IUser>{

    constructor() {
        super();
        this._model = UserModel;
    }
    protected static _instance: UserDB;

    public static getInstance(): UserDB {
        if (!this._instance) {
            this._instance = new UserDB();
        }
        return this._instance;
    }

    public async getByCredentials(email: string, password: string): Promise<IUser> {
        const user: IUser = await this.findOne({ email: email });
        if (user && await user.comparePassword(password)) {
            return user;
        }
        return null;
    }
    public getByToken(kind: string, token: IPayload): Promise<IUser> {
        return this.findOne({ id: token.id, jwtSalts: { [kind]: token.salt } });
    }

    public create({ email, password,name }: { email: string, password: string,name:string }): Promise<IUser> {
        return super.create({ email, password,profile:{name} });
    }
}

export default UserDB.getInstance();