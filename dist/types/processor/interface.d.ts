import { Context, Env, iHandler } from '../context';
export declare class BaseProcessor implements iProcessor {
    name: string;
    constructor();
    handle(ctx: Context, env: Env): void;
}
export interface iProcessor extends iHandler {
}
export type ProcessorTypes = 'config' | 'request' | 'unique';
