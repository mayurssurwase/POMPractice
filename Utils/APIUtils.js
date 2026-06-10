class APIUtils{

constructor(apiContext,loginPayload)
{
    this.apiContext = apiContext,
    this.loginPayload = loginPayload


}

async getToken(){

    const loginResponce = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
       {
          data : this.loginPayload
       }
      )
     console.log(loginResponce.status())
    //   await expect(loginResponce.ok()).toBeTruthy()
    
      const loginResponceJson = await loginResponce.json()
      const token = loginResponceJson.token
    
      return token
}

async createOrder(orderPayload){

    const token = await this.getToken()
    const orderResponce = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

   {
      data : orderPayload,
      headers : {
      "Authorization" : token,
      "Content-Type" : "application/json"
      }
      
   }
)
console.log(orderResponce.status())
const responceStatus = orderResponce.status()

const orderResponceJson = await orderResponce.json()
console.log(orderResponceJson)
const orderID = await orderResponceJson.orders[0]
return {token, orderID, responceStatus }

}

}

module.exports = { APIUtils}