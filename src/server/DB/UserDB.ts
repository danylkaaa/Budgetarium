import AbstractDB from "./AbstractDB";
import { IUser, Payload } from "@DB/models/User";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

class UserDB extends AbstractDB<IUser>{
    protected static _instance: UserDB;

    static get instance(): UserDB {
        if (!this._instance) {
            this._instance = new UserDB();
        }
        return this._instance;
    }

    public async getByCredentials(email: string, password: string): IUser {
        const user: IUser = await this.findOne({ email: email });
        if (user && await user.comparePassword(password)) {
            return user;
        }
        return null;
    }
    public async getByToken(kind: string, token: Payload): IUser {
        const user: IUser = await this.findById(token.id);
        if (user && user.jwtSalts[kind] === token.salt) {
            return user;
        }
        return null;
    }
}
export default UserDB.instance;