import { test, expect } from '@playwright/test';



test(" End to end flow", async ({ page }) => {

   //Login Page
   await page.goto("https://rahulshettyacademy.com/client")
   await page.locator("#userEmail").fill("mayurssurwase@gmail.com")
   await page.locator("#userPassword").fill("Mayur@123")
   await page.locator("#login").click()

   await page.locator(".card-body").first().waitFor()

   const products = await page.locator(".card-body")
   const productsCount = await page.locator(".card-body").count()
   const productName = "ZARA COAT 3"

   for (let i=0; i< productsCount; i++){

      const productTitle = await products.nth(i).locator("b").textContent()

      if(productTitle.trim()=== productName.trim()){

         await products.nth(i).getByRole("button", {name:'Add To cart'}).click()
         break;

      }
   }

   await page.locator("[routerlink*='cart']").click()

   await page.locator("div li").first().waitFor()

   await expect(page.locator('.cartSection h3').filter({ hasText: productName })).toBeVisible();

   await page.getByRole("button", {name:'checkout'}).click()

   await expect(page.locator("div label")).toHaveText("mayurssurwase@gmail.com")

   await page.locator("input[placeholder*='Country']").pressSequentially("ind", {delay: 150})

   await page.locator(".ta-results").waitFor()

   const countryDropdown = await page.locator(".ta-results .ta-item")
   const countryCount = await countryDropdown.count()
   const countryName = "India"

   for (let i=0; i<countryCount; i++){

      const countryReceived = await countryDropdown.nth(i).textContent()

      if(countryReceived.trim()===countryName){

         await countryDropdown.nth(i).click()
         break;
      }

   }

   await page.locator('a[class*="submit"]').click()

   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

   const orderID = await page.locator("label.ng-star-inserted").textContent()
   console.log(orderID.trim())


   await page.locator("button[routerlink*='myorders']").click()

   await page.locator("tbody").first().waitFor()

   const row = await page.locator("tbody tr")

   for (let i=0 ; i< await row.count(); i++){

      const rowOrderID = await row.nth(i).locator("th").textContent()
      if(orderID.trim().includes(rowOrderID.trim())){

         await row.nth(i).getByRole('button', {name:'View'}).click()
         break;
      }
   }

   const orderIDSummaryPage = await page.locator("div .col-text").textContent()
   await expect(orderID.trim()).toContain(orderIDSummaryPage.trim())


   
   

})