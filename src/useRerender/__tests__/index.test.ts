import { useState, useEffect } from "react";
import { renderHook } from "@testing-library/react-hooks";
import useRerender from "../index";

describe("usePrevious", () => {
    it("should be defined", () => {
        expect(useRerender).toBeDefined();
    });
    it("with argument", () => {
        const hook = renderHook(() => {
            const prevValue = useRerender();
            console.log(prevValue);
            useEffect(() => {}, []);

            return prevValue;
        });
        expect(hook.result.current).toEqual(undefined);
    });
});
