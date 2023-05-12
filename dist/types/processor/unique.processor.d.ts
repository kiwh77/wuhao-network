import { Context, Env, ProcessType } from '../context';
import { BaseProcessor, iProcessor } from './interface';
interface UniqueInit {
    interval: number;
}
export declare class UniqueError extends Error {
    constructor(message?: string);
}
export declare class UniqueProcessor extends BaseProcessor implements iProcessor {
    name: ProcessType;
    interval: number;
    constructor(props: UniqueInit);
    handle(ctx: Context, env: Env): Promise<UniqueError>;
}
export {};
