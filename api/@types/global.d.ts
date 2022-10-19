import { PayloadParams } from '../src/domains/users/types/PayloadParams'; 
import { Env } from '../config/express-config';

declare global {
    namespace Express {
        interface Request{
            user: PayloadParams
        }
    };
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    };
}