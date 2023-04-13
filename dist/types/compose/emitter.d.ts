/**
 * 请求事件处理器
 */
export declare class Emitter {
    events: {
        [key: string]: Array<Function>;
    };
    on(event: string, func: Function): void;
    off(event: string, func: Function): void;
    emit(event: string, ...args: any[]): void;
}
