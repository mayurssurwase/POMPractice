import { test, expect, request} from '@playwright/test';
const {APIUtils} = require('../Utils/APIUtils')





test("API Test", async ({page}) => {

   //Login using API

   const loginPayload = {userEmail: "mayurssurwase@gmail.com",userPassword: "Mayur@123"}
   const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
   
const apiContext = await request.newContext()


const apiutils = new APIUtils(apiContext,loginPayload)

//Get token
const token = await apiutils.getToken()

//create order using API
const responce = await apiutils.createOrder(orderPayload)
// createOrder Method returns 2 values
// const Token = responce.token
const orderID = responce.orderID
await expect(responce.responceStatus).toBe(201)

  

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