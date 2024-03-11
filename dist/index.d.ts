/**
 * 本地存储的Hook组件
 * @param {string} key 关键Key
 * @param {T} initialValue 初始值
 * @param {number} timeout 过期时间（单位：毫秒）
 */
declare function useLocalStorage<T>(key: string, initialValue: T, timeout?: number): any[];

declare const useWindowSize: () => any;

declare const useOnGlobalEvent: (type: any, callback: any, options: any) => void;

declare const useNavigatorOnline: () => any;

declare const usePrevious: <T extends unknown>(value: T) => T | undefined;

interface IUseRerender {
    logProps?: boolean;
}
declare function useRerender(config?: IUseRerender): void;

export { useLocalStorage, useNavigatorOnline as useNavigatorOnLine, useOnGlobalEvent, usePrevious, useRerender, useWindowSize };
