class DashboardPage{

constructor(page){
    this.products = page.locator(".card-body")
    this.cartButton = page.locator("[routerlink*='cart']")
    
}

async searchAndaddProductToCart(productName){

   await this.products.first().waitFor()
   const productsCount = await this.products.count()

   for (let i=0; i< productsCount; i++){

      const productTitle = await this.products.nth(i).locator("b").textContent()

      if(productTitle.trim()=== productName.trim()){

         await this.products.nth(i).getByRole("button", {name:'Add To cart'}).click()
         break;

      }
   }


}

async clickOnCartButton(){
await this.cartButton.click()
}

}
module.exports = {DashboardPage}
 

   
