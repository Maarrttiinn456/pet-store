import { test, expect } from "@playwright/test";

test.describe("Authentication Flows", () => {
    test("Unauthenticated user is redirected to /login", async ({ page }) => {
        // Navigate to the homepage using relative URL
        await page.goto("/");

        // Expect the URL to automatically change to /login
        await expect(page).toHaveURL(/.*\/login/);
    });

    test("Empty login form shows validation errors", async ({ page }) => {
        await page.goto("/login");

        await page.getByRole("button", { name: "Přihlásit se" }).click();

        // Verify validation error messages using data-testid
        await expect(page.getByTestId("error-username")).toHaveText(
            "Uživatelské jméno musí mít alespoň 2 znaky"
        );
        await expect(page.getByTestId("error-password")).toHaveText(
            "Heslo musí mít alespoň 5 znaků"
        );
    });

    test("Username with 1 character shows validation error", async ({ page }) => {
        await page.goto("/login");

        // Use data-testid for inputs
        await page.getByTestId("login-username").fill("a");
        await page.getByTestId("login-password").fill("validpass1");

        // Use getByRole + name for button
        await page.getByRole("button", { name: "Přihlásit se" }).click();

        await expect(page.getByTestId("error-username")).toHaveText(
            "Uživatelské jméno musí mít alespoň 2 znaky"
        );
    });

    test("Password without digit shows validation error", async ({ page }) => {
        await page.goto("/login");

        await page.getByTestId("login-username").fill("validuser");
        await page.getByTestId("login-password").fill("nodigits");
        await page.getByRole("button", { name: "Přihlásit se" }).click();

        await expect(page.getByTestId("error-password")).toHaveText(
            "Heslo musí obsahovat alespoň jednu číslici"
        );
    });

    test("Successful login redirects to homepage", async ({ page }) => {
        await page.goto("/login");

        // Fill in the credentials
        await page.getByTestId("login-username").fill("testuser");
        await page.getByTestId("login-password").fill("password123");

        // Click the login button
        await page.getByRole("button", { name: "Přihlásit se" }).click();

        // Verify successful redirection to base URL with status parameter
        await expect(page).toHaveURL(/.*\/\?status=available/);

        // Verify we see the homepage heading using getByRole for accessibility validation
        await expect(page.getByRole("heading", { name: "Všechna zvířátka" })).toBeVisible();
    });
});
