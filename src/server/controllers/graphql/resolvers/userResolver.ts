import * as validator from "validator";
import { ValidationError, Logger } from "@utils";
import UserDB from "@DB/UserDB";
const logger = Logger(module);

export default {
    Mutation: {
        signup: (_: any, data: any, context: any) => {
            let errors: Array<ValidationError> = [];
            logger.debug(data);
            if (!validator.isEmail(data.email)) {
                errors.push(new ValidationError("email", "Email is not valid"));
            }
            if (!UserDB.isUnused({ email: data.email })){
                errors.push(new ValidationError("email", "Email is already taken"));                    
            }
        }
    },
    Query: {
        user: () => {
            return {
                id: "asmlamlamsla",
                gender: "male"
            }
        },
        users: () => {
            return [
                {
                    id: "asmlamlamsla",
                    gender: "male"
                }
            ]
        }
    }
}