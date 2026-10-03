import { test as base, expect } from "@playwright/test";
import { projects } from "./projects.js";

const appOrigin = "http://127.0.0.1:4173";
const backendOrigin = "http://127.0.0.1:54321";
const image = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><rect width="100%" height="100%" fill="#582a8c"/><text x="40" y="200" fill="white" font-size="32">Local portfolio fixture</text></svg>';

export const test = base.extend({
  backend: async ({ context, page }, provide, testInfo) => {
    const backend = { projects: structuredClone(projects), error: null, requests: [] };
    const unexpectedRequests = [];
    const pageErrors = [];
    const consoleMessages = [];

    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (["warning", "error"].includes(message.type())) {
        consoleMessages.push({ type: message.type(), text: message.text() });
      }
    });

    await context.route("**/*", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin === backendOrigin) {
        const headers = { "access-control-allow-origin": "*" };
        backend.requests.push({ method: request.method(), pathname: url.pathname });
        if (request.method() === "OPTIONS") {
          await route.fulfill({ status: 204, headers: {
            ...headers,
            "access-control-allow-methods": "GET, OPTIONS",
            "access-control-allow-headers": "*",
          } });
        } else if (request.method() === "GET" && url.pathname === "/rest/v1/projects") {
          await route.fulfill({
            status: backend.error ? 500 : 200,
            headers,
            json: backend.error || backend.projects,
          });
        } else {
          unexpectedRequests.push(`${request.method()} ${url.origin}${url.pathname}`);
          await route.abort("blockedbyclient");
        }
      } else if (url.origin === "https://images.example.test" && request.resourceType() === "image") {
        await route.fulfill({ contentType: "image/svg+xml", body: image });
      } else if (url.origin === appOrigin) {
        await route.continue();
      } else {
        unexpectedRequests.push(`${request.method()} ${url.origin}${url.pathname}`);
        await route.abort("blockedbyclient");
      }
    });

    await provide(backend);

    if (consoleMessages.length) {
      await testInfo.attach("browser-console", {
        body: JSON.stringify(consoleMessages, null, 2),
        contentType: "application/json",
      });
    }
    expect(unexpectedRequests, "Tests must not contact real services or submit backend writes").toEqual([]);
    expect(pageErrors, "The page must not throw uncaught errors").toEqual([]);
  },
});

export { expect };

export async function enterLocalAdmin(page) {
  await page.goto("/#admin");
  // This nonsecret placeholder only opens the client-side editor. No credentials
  // are sent, and the fixture rejects every backend mutation request.
  await page.getByPlaceholder("Admin password").fill("local-ui-test-placeholder");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Existing Projects" })).toBeVisible();
  await expect(page.getByText("Loading...", { exact: true })).toHaveCount(0);
}
