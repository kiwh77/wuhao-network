import { BaseProcessor, iProcessor } from './interface';
import { Context, Env } from '../context';
export declare class ConfigProcessor extends BaseProcessor implements iProcessor {
    name: string;
    handle(ctx: Context, env: Env): Promise<Error>;
}
