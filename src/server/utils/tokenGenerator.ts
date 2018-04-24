import jsonwebtoken from "jsonwebtoken";
import config from "@config";

export default {

    generate: (kind: string, payload: object): string => {
        return jsonwebtoken.sign(
            payload,
            config.get(`security.secrets.${kind.toUpperCase}`),
            {
                algorithm: config.get(`security.TOKEN_GENERATOR_ALGORITHM`),
                expiresIn: config.get(`security.tokenLife.${kind.toUpperCase()}`)
            }
        );
    },

    decode: (kind: string, token: string): any => {
        return jsonwebtoken.verify(
            token,
            config.get(`security.secrets.${kind.toUpperCase}`),
            {
                algorithms: config.get(`security.TOKEN_GENERATOR_ALGORITHM`)
            }
        );
    }
}