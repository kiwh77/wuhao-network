import { BaseProcessor, iProcessor } from './interface';
import { Context, Env, ProcessType } from '../context';
export declare class ConfigProcessor extends BaseProcessor implements iProcessor {
    name: ProcessType;
    handle(ctx: Context, env: Env): Promise<Error>;
}
