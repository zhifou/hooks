// src/useLocalStorage/index.ts
import { useState } from "react";
function useLocalStorage(key, initialValue, timeout) {
  const remove = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item && timeout) {
        const current = (/* @__PURE__ */ new Date()).getTime();
        const result = JSON.parse(item);
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
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      const current = (/* @__PURE__ */ new Date()).getTime() + (timeout || 0);
      const item = {
        expired: current,
        value: valueToStore
      };
      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue, remove];
}
var useLocalStorage_default = useLocalStorage;

// src/useWindowSize/index.ts
import { useEffect, useState as useState2, useCallback } from "react";
var useWindowSize = () => {
  const [state, setState] = useState2(() => {
    const { clientWidth, clientHeight } = document.documentElement;
    return {
      width: clientWidth,
      height: clientHeight
    };
  });
  const onResize = useCallback(() => {
    const { clientWidth, clientHeight } = document.documentElement;
    setState({
      width: clientWidth,
      height: clientHeight
    });
  }, []);
  useEffect(() => {
    window.addEventListener("resize", onResize, false);
    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, []);
  return state;
};
var useWindowSize_default = useWindowSize;

// src/useOnGlobalEvent/index.ts
import { useEffect as useEffect2, useRef } from "react";
var useOnGlobalEvent = (type, callback, options) => {
  const listener = useRef(null);
  const previousProps = useRef({ type, options });
  useEffect2(() => {
    const { type: previousType, options: previousOptions } = previousProps;
    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions
      );
    }
    listener.current = window.addEventListener(type, callback, options);
    previousProps.current = { type, options };
    return () => {
      window.removeEventListener(type, listener.current, options);
    };
  }, [callback, type, options]);
};
var useOnGlobalEvent_default = useOnGlobalEvent;

// src/useNavigatorOnLine/index.ts
import { useEffect as useEffect3, useState as useState3 } from "react";
var getOnLineStatus = () => typeof navigator !== "undefined" && typeof navigator.onLine === "boolean" ? navigator.onLine : true;
var useNavigatorOnline = () => {
  const [status, setStatus] = useState3(getOnLineStatus());
  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);
  useEffect3(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);
  return status;
};
var useNavigatorOnLine_default = useNavigatorOnline;

// src/usePrevious/index.ts
import { useRef as useRef2, useEffect as useEffect4 } from "react";
var usePrevious = (value) => {
  const ref = useRef2();
  useEffect4(() => {
    ref.current = value;
  });
  return ref.current;
};
var usePrevious_default = usePrevious;

// src/useRerender/index.ts
import React2, { useEffect as useEffect5, useRef as useRef3 } from "react";
function useRerender(config = {}) {
  var _a, _b, _c, _d, _e;
  if (process.env.NODE_ENV === "production") {
    return;
  }
  const logProps = (_a = config.logProps) != null ? _a : true;
  const owner = (_d = (_c = (_b = React2) == null ? void 0 : _b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) == null ? void 0 : _c.ReactCurrentOwner) == null ? void 0 : _d.current;
  const name = ((_e = owner == null ? void 0 : owner.type) == null ? void 0 : _e.name) ? `<${owner.type.name} />` : "";
  const props = owner == null ? void 0 : owner.pendingProps;
  const propsMessage = logProps ? ` with props: ${JSON.stringify(props)}` : "";
  const prevPropsRef = useRef3(null);
  useEffect5(() => {
    console.log(`Component ${name} mounted${propsMessage}`);
    return () => {
      console.log(`Component ${name} unmounted`);
    };
  }, []);
  if (prevPropsRef.current) {
    console.log(`Component ${name} rerender${propsMessage}`);
  }
  prevPropsRef.current = props;
}
export {
  useLocalStorage_default as useLocalStorage,
  useNavigatorOnLine_default as useNavigatorOnLine,
  useOnGlobalEvent_default as useOnGlobalEvent,
  usePrevious_default as usePrevious,
  useRerender,
  useWindowSize_default as useWindowSize
};
//# sourceMappingURL=index.js.map