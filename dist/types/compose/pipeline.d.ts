import { Context, Env, iHandler } from '../context';
export declare class Pipeline {
    exec(handlers: iHandler[], ctx: Context, env: Env): Promise<import("axios").AxiosResponse<any, any>>;
}
