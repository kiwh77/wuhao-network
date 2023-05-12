type eventType = string | number | symbol;
/**
 * 请求事件处理器
 */
export declare class Emitter {
    events: {
        [key: eventType]: Array<Function>;
    };
    on(event: eventType, func: Function): void;
    off(event: eventType, func: Function): void;
    emit(event: eventType, ...args: any[]): void;
}
export {};
