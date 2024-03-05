/**
 * @file useLocalStorage 组件
 * @author zhifou
 */
import { useState } from "react";

/**
 * 本地存储的Hook组件
 * @param {string} key 关键Key
 * @param {T} initialValue 初始值
 * @param {number} timeout 过期时间（单位：毫秒）
 */
function useLocalStorage<T>(key: string, initialValue: T, timeout?: number) {
    const remove = () => {
        try {
            (window as any).localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = (window as any).localStorage.getItem(key);
            if (item && timeout) {
                const current = new Date().getTime();
                const result = JSON.parse(item);
                // 判断是否过期，已过期
                if (result.expired < current) {
                    remove();
                    return initialValue;
                }
            }
            return item ? JSON.parse(item).value : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = <T>(value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            const current = new Date().getTime() + (timeout || 0);
            const item = {
                expired: current,
                value: valueToStore,
            };
            (window as any).localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue, remove];
}

export default useLocalStorage;
