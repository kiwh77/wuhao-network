import { Context, Env, ProcessType } from '../context';
import { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { BaseProcessor, iProcessor } from './interface';
export declare class RequestProcessor extends BaseProcessor implements iProcessor {
    name: ProcessType;
    axiosInstance: AxiosInstance;
    constructor(props?: CreateAxiosDefaults);
    handle(ctx: Context, env: Env): Promise<void>;
}
