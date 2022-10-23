import { PayloadParams } from '../src/domains/users/types/PayloadParams'; 

interface Env {
    DB: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    SECRET_KEY: string;
    NODE_ENV: string;
    JWT_EXPIRATION: string;
    APP_URL: string;
}

declare global {
    namespace Express {
        interface Request{
            user?: PayloadParams
        }
    };
    namespace NodeJS {
        interface ProcessEnv extends Env {}
        // interface ProcessEnv {
        //     DB: string;
        //     DB_USER: string;
        //     DB_PASSWORD: string;
        //     DB_HOST: string;
        //     SECRET_KEY: string;
        //     NODE_ENV: string;
        //     JWT_EXPIRATION: string;
        //     APP_URL: string;
        // }
    };
}