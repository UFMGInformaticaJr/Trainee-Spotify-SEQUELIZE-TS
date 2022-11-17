import { PayloadParams } from '../src/domains/users/types/PayloadParams'; 

declare global {
    namespace Express {
        interface Request{
            user?: PayloadParams
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            DB: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_HOST: string;
            SECRET_KEY: string;
            NODE_ENV: string;
            JWT_EXPIRATION: string;
            APP_URL: string;
        }
    }
}