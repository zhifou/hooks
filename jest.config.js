import type { Config } from "jest";

const config: Config = {
    verbose: true,
    preset: "ts-jest/presets/js-with-ts",
    // 配置dom的测试环境
    testEnvironment: "jsdom",
};

export default config;
