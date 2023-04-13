import { RequestOptions } from '../context';
export declare class Bucket {
    requests: {
        [key: string]: {
            timestamp: number;
        };
    };
    getId(service: RequestOptions): string;
    verify(id: string, interval: number): string | false;
    pop(id: string): void;
    private _getId;
}
