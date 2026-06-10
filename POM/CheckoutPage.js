class CheckoutPage{

constructor(page){
    this.checkoutItems = page.locator("div li")
    this.checkoutProduct = page.locator('.cartSection h3')
    this.checkoutButton = page.getByRole("button", {name:'checkout'})
}

async waitForCheckoutPageToLoad(){
    await this.checkoutItems.first().waitFor()

}

  getCheckoutProductLocator(productName) {
    return this.checkoutProduct.filter({ hasText: productName });
  }

async clickOnCheckoutButton(){

    await this.checkoutButton.click()

}



}
module.exports = {CheckoutPage}
