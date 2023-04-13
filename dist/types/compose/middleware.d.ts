import { NetworkInit, Stack, iHandler } from '../context';
export interface iMiddleware extends iHandler {
    at: string;
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
}
