/**
 * @file useNavigatorOnline 组件
 * @author zhifou
 */
import React, { useEffect, useState } from "react";

const getOnLineStatus = () =>
    typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
        ? navigator.onLine
        : true;

const useNavigatorOnline = () => {
    const [status, setStatus] = useState(getOnLineStatus());

    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);

    useEffect(() => {
        window.addEventListener("online", setOnline);
        window.addEventListener("offline", setOffline);

        return () => {
            window.removeEventListener("online", setOnline);
            window.removeEventListener("offline", setOffline);
        };
    }, []);

    return status;
};

export default useNavigatorOnline;
