import { test, expect, request } from '@playwright/test';

const fakePayLoadOrders = { data: [], message: "No Orders" };


test("API Test", async ({ page }) => {



    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("mayurssurwase@gmail.com")
    await page.locator("#userPassword").fill("Mayur@123")
    await page.locator("#login").click()
    await page.waitForLoadState("networkidle")
    await page.locator(".card-body b").first().waitFor()

    // Intercept Orders API
    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async (route) => {

            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(fakePayLoadOrders)
            });

        }
    );

    // Open Orders page
    await page.locator("button[routerlink*='myorders']").click();

    await page.pause();
});