import tsconfigPath from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [tsconfigPath()],
    test: {
        globals: true,
        passWithNoTests: true,
        environment: "happy-dom",
        exclude: ["**/node_modules/**", "**/dist/**", "**/tests/**"],
        setupFiles: [
            "@testing-library/jest-dom/vitest", // adds additional assertions for dom elements
        ],
        coverage: {
            enabled: true,
            skipFull: true,
            include: ["src/shared", "src/store"],
            ignoreEmptyLines: true,
            thresholds: {
                functions: 50,
                branches: 50,
            },
        },
    },
});
