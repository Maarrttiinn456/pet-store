import { describe, expect, it } from "vitest";
import { formatPetStatus } from "./status";

describe("status", () => {
    describe("formatPetStatus", () => {
        it("Should return statuses in correct format", () => {
            expect(formatPetStatus("available")).toBe("Dostupný");
            expect(formatPetStatus("pending")).toBe("Čekající");
            expect(formatPetStatus("sold")).toBe("Prodán");
        });
        it("Should return dostupný when undefined", () => {
            expect(formatPetStatus(undefined)).toBe("Dostupný");
        });
    });
});
