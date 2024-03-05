import { renderHook } from "@testing-library/react-hooks";
import useWindowSize from "../index";

describe("useWindowSize", () => {
    it("should be defined", () => {
        expect(useWindowSize).toBeDefined();
    });
    it("with argument", () => {
        const hook = renderHook(() => useWindowSize());
        expect(hook.result.current.width).toEqual(0);
        expect(hook.result.current.height).toEqual(0);
    });
});
