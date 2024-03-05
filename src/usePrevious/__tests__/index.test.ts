import { useState, useEffect } from "react";
import { renderHook } from "@testing-library/react-hooks";
import usePrevious from "../index";

describe("usePrevious", () => {
    it("should be defined", () => {
        expect(usePrevious).toBeDefined();
    });
    it("with argument", () => {
        const hook = renderHook(() => {
            const [value, setValue] = useState(10);
            const prevValue = usePrevious(value);

            useEffect(() => {
                setValue(20);

                setTimeout(() => {
                    setValue(31);
                }, 1000);
            }, []);

            return prevValue;
        });
        expect(hook.result.current).toEqual(10);
    });
});
