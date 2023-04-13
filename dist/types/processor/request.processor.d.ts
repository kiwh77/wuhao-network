import { Context, Env } from '../context';
import { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { BaseProcessor, iProcessor } from './interface';
export declare class RequestProcessor extends BaseProcessor implements iProcessor {
    name: string;
    axiosInstance: AxiosInstance;
    constructor(props?: CreateAxiosDefaults);
    handle(ctx: Context, env: Env): Promise<void>;
}
