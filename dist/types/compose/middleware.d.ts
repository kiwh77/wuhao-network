import { NetworkInit, Stack, iHandler } from '../context';
export interface iMiddleware extends iHandler {
    /**
     * 中间件执行位置，同处理器勾子名称，例'beforeRequest'或before(ProcessorType.request)
     */
    at: string;
    /**
     * 是否全局中间件，注册为全局中间件会应用到所有服务
     */
    global?: boolean;
}
export declare class BaseMiddleware implements iMiddleware {
    at: string;
    name: string;
    handle(): void;
}
export declare class MiddlewareStack implements Stack<iMiddleware> {
    sources: iMiddleware[];
    constructor(props: NetworkInit);
    register<T extends iMiddleware>(middleware: T): string;
    verify(mid: iMiddleware): Boolean;
    find(name: string): iMiddleware;
    getGlobal(at: string): iMiddleware[];
}
