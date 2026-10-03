import { mkdir } from "node:fs/promises";
import path from "node:path";
import { test, expect, enterLocalAdmin } from "./fixtures/portfolio.js";
import { projects } from "./fixtures/projects.js";

async function captureHome(page, filename) {
  const directory = process.env.PORTFOLIO_SCREENSHOT_DIR;
  if (directory) {
    await mkdir(directory, { recursive: true });
    await page.screenshot({ path: path.join(directory, filename), fullPage: true });
  }
}

// Requesting this fixture installs the network sandbox before every navigation.
test.beforeEach(async ({ backend }) => {
  expect(backend.requests).toEqual([]);
});

test("public home renders its sections and mocked projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByRole("link", { name: "About", exact: true })).toHaveAttribute("href", "#about");
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Contact me", exact: true })).toBeVisible();
  await expect(page.getByRole("img", { name: projects[0].title, exact: true })).toBeVisible();
  await expect(page.getByRole("img", { name: projects[1].title, exact: true })).toBeVisible();
  await expect(page.getByText("Loading...", { exact: true })).toHaveCount(0);
  await captureHome(page, "home-desktop.png");
});

test("language cycles through French and Korean, persists on reload, and returns to English", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Français", exact: true }).click();
  await expect(page.getByRole("link", { name: "À propos", exact: true })).toBeVisible();
  await expect(page.getByText(projects[0].title_fr, { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("link", { name: "À propos", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "한국어", exact: true }).click();
  await expect(page.getByRole("link", { name: "소개", exact: true })).toBeVisible();
  await expect(page.getByText(projects[0].title_ko, { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("link", { name: "소개", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("preferredLanguage"))).toBe("en");
});

test("project modal wraps carousel in both directions and resets after reopening", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("img", { name: projects[0].title, exact: true }).click();
  const modal = page.getByRole("dialog", { name: "Project Details" });
  await expect(modal).toBeVisible();
  await expect(modal.getByRole("img", { name: "Image 1", exact: true })).toHaveAttribute("src", projects[0].images_carousel[0]);
  await modal.getByRole("button", { name: ">", exact: true }).click();
  await expect(modal.getByRole("img", { name: "Image 2", exact: true })).toHaveAttribute("src", projects[0].images_carousel[1]);
  await modal.getByRole("button", { name: ">", exact: true }).click();
  await expect(modal.getByRole("img", { name: "Image 1", exact: true })).toBeVisible();
  await modal.getByRole("button", { name: "<", exact: true }).click();
  await expect(modal.getByRole("img", { name: "Image 2", exact: true })).toBeVisible();
  await modal.getByRole("button", { name: "X", exact: true }).click();
  await expect(modal).toHaveCount(0);
  await page.getByRole("img", { name: projects[0].title, exact: true }).click();
  await expect(modal.getByRole("img", { name: "Image 1", exact: true })).toHaveAttribute("src", projects[0].images_carousel[0]);
  await page.keyboard.press("Escape");
  await expect(modal).toHaveCount(0);
  await expect(page).toHaveURL("/");
});

test("modal opens repeatedly, closes by overlay, and displays the newly selected project", async ({ page }) => {
  await page.goto("/");
  const modal = page.getByRole("dialog", { name: "Project Details" });
  for (const project of [projects[0], projects[1], projects[0]]) {
    await page.getByRole("img", { name: project.title, exact: true }).click();
    await expect(modal.getByRole("heading", { name: project.title, exact: true })).toBeVisible();
    await expect(modal.getByRole("img", { name: "Image 1", exact: true })).toHaveAttribute("src", project.images_carousel[0]);
    await page.locator(".ReactModal__Overlay").click({ position: { x: 5, y: 5 } });
    await expect(modal).toHaveCount(0);
  }
});

test("single-image carousel remains on its image in either direction", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("img", { name: projects[1].title, exact: true }).click();
  const modal = page.getByRole("dialog", { name: "Project Details" });
  for (const direction of [">", "<", ">"]) {
    await modal.getByRole("button", { name: direction, exact: true }).click();
    await expect(modal.getByRole("img", { name: "Image 1", exact: true })).toHaveAttribute("src", projects[1].images_carousel[0]);
  }
});

test("admin hash navigation, Back to site, browser back and forward stay synchronized", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => { window.location.hash = "admin"; });
  await expect(page.getByRole("heading", { name: "Admin Panel" })).toBeVisible();
  await expect(page.getByRole("navigation")).toHaveCount(0);
  await page.getByRole("link", { name: "Back to site" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Admin Panel" })).toHaveCount(0);
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Admin Panel" })).toBeVisible();
  await expect(page.getByPlaceholder("Admin password")).toHaveValue("");
  await page.goForward();
  await expect(page.getByRole("navigation")).toBeVisible();
});

test("admin rejects a blank local login and returns to the home page", async ({ page, backend }) => {
  await page.goto("/#admin");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await expect(page.getByText("Please enter a password.", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Existing Projects" })).toHaveCount(0);
  expect(backend.requests).toEqual([]);
  await page.getByRole("link", { name: "Back to site" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
});

test("admin edit, cancel, edit another project and repeat reset form state", async ({ page }) => {
  await enterLocalAdmin(page);
  const title = page.getByPlaceholder("Project title (English)");
  await expect(page.getByRole("heading", { name: "Add New Project" })).toBeVisible();
  await expect(title).toHaveValue("");
  for (const index of [0, 1, 0]) {
    await page.getByRole("button", { name: "Edit", exact: true }).nth(index).click();
    await expect(page.getByRole("heading", { name: `Edit: ${projects[index].title}`, exact: true })).toBeVisible();
    await expect(title).toHaveValue(projects[index].title);
    await expect(page.getByPlaceholder("Description (English)")).toHaveValue(projects[index].description_en);
    await expect(page.getByRole("img", { name: "Main preview", exact: true })).toHaveAttribute("src", projects[index].image_url);
    await title.fill("Unsaved local change");
    await page.getByRole("button", { name: "Cancel editing", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Add New Project" })).toBeVisible();
    await expect(title).toHaveValue("");
    await expect(page.getByRole("img", { name: "Main preview", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Update Project", exact: true })).toHaveCount(0);
  }
  await page.getByRole("link", { name: "Back to site" }).click();
  await page.goBack();
  await expect(page.getByPlaceholder("Admin password")).toHaveValue("");
  await expect(page.getByRole("heading", { name: "Existing Projects" })).toHaveCount(0);
});

test("empty project response leaves the public home usable", async ({ page, backend }) => {
  backend.projects = [];
  await page.goto("/");
  await expect.poll(() => backend.requests.filter((request) => request.method === "GET").length).toBeGreaterThan(0);
  await expect(page.getByText("Loading...", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Contact me", exact: true })).toBeVisible();
  await expect(page.getByRole("img", { name: projects[0].title, exact: true })).toHaveCount(0);
});

test("failed public project response shows the error without crashing", async ({ page, backend }) => {
  backend.error = { code: "TEST_ERROR", message: "Projects are temporarily unavailable.", details: null, hint: null };
  await page.goto("/");
  await expect(page.getByText(backend.error.message, { exact: true })).toBeVisible();
  await expect(page.getByText("Loading...", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("navigation")).toBeVisible();
});

test("empty admin project response shows the empty state and add form", async ({ page, backend }) => {
  backend.projects = [];
  await enterLocalAdmin(page);
  await expect(page.getByText("No projects found.", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Add New Project" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Edit", exact: true })).toHaveCount(0);
});

test("mobile home and modal remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByRole("img", { name: projects[0].title, exact: true })).toBeVisible();
  await captureHome(page, "home-mobile.png");
  await page.getByRole("img", { name: projects[0].title, exact: true }).click();
  const modal = page.getByRole("dialog", { name: "Project Details" });
  await expect(modal).toBeVisible();
  const bounds = await modal.boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(390);
  await modal.getByRole("button", { name: "X", exact: true }).click();
  await expect(modal).toHaveCount(0);
});
