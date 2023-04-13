import 'reflect-metadata';
import { iArrayService, iService, ServiceStack } from './compose/service';
import { ProcessorStack } from './compose/processor';
import { iMiddleware, MiddlewareStack } from './compose/middleware';
import { Bucket } from './compose/bucket';
import { Emitter } from './compose/emitter';
import { Pipeline } from './compose/pipeline';
import { ContextInit, NetworkInit, RequestParams } from './context';
export declare class WuhaoNetwork {
    static simpleInstance: WuhaoNetwork;
    pipe: Pipeline;
    bucket: Bucket;
    emitter: Emitter;
    service: ServiceStack;
    processor: ProcessorStack;
    middleware: MiddlewareStack;
    constructor(props?: NetworkInit);
    send(options: ContextInit): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * 快速发起get请求
     * @param url
     * @param options
     */
    get(url: string, options?: RequestParams): Promise<import("axios").AxiosResponse<any, any>>;
    post(url: string, options?: RequestParams): Promise<import("axios").AxiosResponse<any, any>>;
    put(url: string, options?: RequestParams): Promise<import("axios").AxiosResponse<any, any>>;
    delete(url: string, options?: RequestParams): Promise<import("axios").AxiosResponse<any, any>>;
    patch(url: string, options?: RequestParams): Promise<import("axios").AxiosResponse<any, any>>;
    install(app: any): void;
}
/**
 * 初始化
 * @param props 初始化参数
 * @returns
 * @example
 *  app.use(createNetwork())
 */
export declare function createNetwork(props?: NetworkInit): WuhaoNetwork;
/**
 * 定义服务接口，返回调用函数
 * @param serviceDefine: iService | iArrayService
 * @returns request(params: RequestParams)
 */
export declare function useService(serviceDefine: iService | iArrayService): (params: RequestParams) => {};
/**
 * 注册中间件
 * @param middleware 中间件参数
 * @returns 中间件名称
 */
export declare function useMiddleware(middleware: iMiddleware): string;
/**
 * 发起请求
 * @param name 服务配置中的名称
 * @param params 请求参数
 * @returns
 */
export declare function useFetch(name: string, params?: RequestParams): Promise<import("axios").AxiosResponse<any, any>>;
