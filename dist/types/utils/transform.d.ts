/**
 * 转换path参数
 * @param url 需要转换的url
 * @param params 参数
 */
export declare function transformPathParams(url: string, path?: {
    [key: string]: string;
}): string;
/**
 * 拼接query参数
 * @param url 需要拼接的url
 * @param params 参数
 */
export declare function transformQueryParams(url: string, query?: {
    [key: string]: string;
}): string;
