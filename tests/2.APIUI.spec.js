import { test, expect, request} from '@playwright/test';



test("APIUI Test", async ({page}) => {

   //Login using API

   const loginPayload = {userEmail: "mayurssurwase@gmail.com",userPassword: "Mayur@123"}
   const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
   
const apiContext = await request.newContext()
const loginResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
   {
      data : loginPayload
   }
  )
 console.log(loginResponce.status())
  await expect(loginResponce.ok()).toBeTruthy()

  const loginResponceJson = await loginResponce.json()
  const token = loginResponceJson.token
  console.log(token)

  //create order using API

  const orderResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

   {
      data : orderPayload,
      headers : {
      "Authorization" : token,
      "Content-Type" : "application/json"
      }
      
   }
)
console.log(orderResponce.status())
await expect(orderResponce.ok()).toBeTruthy()

const orderResponceJson = await orderResponce.json()
console.log(orderResponceJson)
const orderID = await orderResponceJson.orders[0]
console.log(orderID)

page.addInitScript(value => {

    window.localStorage.setItem('token', value);

}, token)
    
await page.goto("https://rahulshettyacademy.com/client")


await page.locator("button[routerlink*='myorders']").click()
await page.locator("tbody").waitFor();

const row = await page.locator("tbody tr")


for (let i=0; i< await row.count(); i++){
    const rowOrderID = await row.nth(i).locator("th").textContent()

    if (orderID.includes(rowOrderID)){

        await row.nth(i).locator("td button").first().click()
        break;
    
    }

    
}
const orderIDSummary= await page.locator(".col-text.-main").textContent()

await expect(orderID.includes(orderIDSummary)).toBeTruthy()

  

})