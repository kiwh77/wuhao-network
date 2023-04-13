import { NetworkInit, Stack } from '../context';
import { iProcessor, ProcessorTypes } from '../processor/interface';
export declare class ProcessorStack implements Stack<iProcessor> {
    sources: iProcessor[];
    constructor(props: NetworkInit);
    push(processor: iProcessor): this;
    before(index: ProcessorTypes | string | number, processor: iProcessor): this;
    after(index: ProcessorTypes | string | number, processor: iProcessor): this;
    replace(index: ProcessorTypes | string | number, processor: iProcessor): this;
    remove(index: ProcessorTypes | string | number): this;
    private _getIndex;
    register<T extends iProcessor>(processor: T): void;
}
