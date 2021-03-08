import {renderHook, act} from "@testing-library/react-hooks";
import useLocalStorage from '../index';

describe('useWindowSize', () => {
    it('should be defined', () => {
        expect(useLocalStorage).toBeDefined();
    });

    const setUp = <T>(key: string, initValue: T, timeout?: number) => {
        return renderHook(() => {
            const [value, setValue, remove] = useLocalStorage(key, initValue, timeout);
            return {
                value, setValue, remove
            } as const;
        });
    };

    it('with argument', () => {
        
        const LOCAL_STORAGE_KEY = 'test-key';
        const hook = setUp(LOCAL_STORAGE_KEY, 'A');
        expect(hook.result.current.value).toEqual('A');
        act(() => {
            hook.result.current.setValue('B');
        });
        expect(hook.result.current.value).toEqual('B');
    });
});