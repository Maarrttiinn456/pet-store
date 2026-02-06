// src/mocks/handlers.ts
import { http, HttpResponse, delay } from "msw";

type PetStatus = "available" | "pending" | "sold";

const PETS = [
    { id: 1, name: "Rex", status: "available" as PetStatus, photoUrls: [] as string[] },
    { id: 2, name: "Bella", status: "pending" as PetStatus, photoUrls: [] as string[] },
    { id: 3, name: "Goldie", status: "sold" as PetStatus, photoUrls: [] as string[] },
];

function parseStatuses(url: URL): PetStatus[] {
    const all = url.searchParams.getAll("status");
    const raw = all.length ? all.join(",") : (url.searchParams.get("status") ?? "available");
    return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) as PetStatus[];
}

export const handlers = [
    http.get("*/v2/pet/findByStatus", async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const statuses = parseStatuses(url);

        const result = PETS.filter((p) => statuses.includes(p.status));
        return HttpResponse.json(result);
    }),
];
