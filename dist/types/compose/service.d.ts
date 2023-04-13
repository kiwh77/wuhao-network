import { RequestParams } from './../context';
import { NetworkInit, Stack } from '../context';
import { iMiddleware } from './middleware';
import 'reflect-metadata';
export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'purge' | 'PURGE' | 'link' | 'LINK' | 'unlink' | 'UNLINK';
/**
 * 接口、服务基本信息
 */
export interface iServiceBase {
    /**
     * 服务名
     */
    name?: string;
    /**
     * 服务url
     */
    url: string;
    /**
     * 服务类型
     */
    method: Method | string;
}
/**
 * 接口、服务进阶信息
 */
export interface iService extends iServiceBase {
    /**
     * 服务标签
     */
    tag?: Array<string> | string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 默认参数
     */
    default?: Pick<RequestParams, 'path'> & Pick<RequestParams, 'params'> & Pick<RequestParams, 'body'>;
    /**
     * 特性
     */
    middleware?: Array<iMiddleware | string>;
}
/**
 * 数组式申明
 */
export type iArrayService = [
    PropType<iService, 'name'>,
    PropType<iService, 'method'>,
    PropType<iService, 'url'>,
    Omit<iService, 'name' | 'method' | 'url'>?
];
export declare function isService(obj: any): boolean;
export declare class ServiceStack implements Stack<iService> {
    sources: iService[];
    constructor(props: NetworkInit);
    register(service: iService | iArrayService): void;
    find(name: string): iService;
}
export declare function transformService(params: iService | iArrayService): iService;
