import { IUser } from "@DB/models/User";
export default function AuthMiddleware(allowedStrategies: string[], done: any): any {
    return (obj: any, data: any, context: { user: any }) => {
        if (context.user && allowedStrategies.indexOf(context.user.usedStrategy) >= 0) {
            return done(obj, data, context);
        } else {
            let err: any = new Error("Unauthorized");
            err.status = 401;
            throw err;
        }
    };
}