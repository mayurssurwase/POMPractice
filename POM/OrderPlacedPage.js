class OrderPlacedPage{

constructor(page){

    this.orderPlacedText = page.locator(".hero-primary")
    this.orderID = page.locator("label.ng-star-inserted")
    this.myOrdersButton = page.locator("button[routerlink*='myorders']")
    
}

getOrderPlacedLoacator(){
 return this.orderPlacedText
}

async getOrderIDText(){
    return await this.orderID.textContent()
    
}

async clickOnMyOrders(){
    await this.myOrdersButton.click()

}



}
module.exports = {OrderPlacedPage}




   



  
   
