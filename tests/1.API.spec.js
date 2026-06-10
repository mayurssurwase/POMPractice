import { test, expect, request} from '@playwright/test';



test("API Test", async () => {

   //Login using API

   const loginPayload = {userEmail: "mayurssurwase@gmail.com",userPassword: "Mayur@123"}
   const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
   
const apiContext = await request.newContext()
const loginResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
   {
      data : loginPayload
   }
  )

await expect(loginResponce.status()).toBe(200)
console.log("********")
const body = await loginResponce.body()
console.log(body.toString())
console.log("********")
  

  const loginResponceJson = await loginResponce.json()
  console.log(loginResponceJson)
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

  

})