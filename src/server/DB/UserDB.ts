import AbstractDB from "./AbstractDB";
import {IPayload, IUser, UserModel} from "./models/User";
import {Logger} from "@utils";

const logger = Logger(module);

class UserDB extends AbstractDB<IUser> {

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
        const user: IUser = await this.findOne({email: email});
        if (user && await user.comparePassword(password)) {
            return user;
        }
        return null;
    }

    public async getByToken(kind: string, token: IPayload): Promise<IUser> {
        const user = await this.findById(token.id);
        if (!user) return null;
        if ((user.jwtSecrets as any)[kind] === token.salt) {
            return user;
        } else {
            return null;
        }
    }

    public create({email, password, name}: { email: string, password: string, name: string }): Promise<IUser> {
        return super.create({email, password, name});
    }

    public plainFields() {
        return {
            id: 1,
            name: 1
        };
    }
}

export default UserDB.getInstance();