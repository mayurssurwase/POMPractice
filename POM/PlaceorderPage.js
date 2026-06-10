class PlaceorderPage{

constructor(page){
    this.placeholderTextEmail = page.locator("div label")
    this.countryDropdownLocator = page.locator("input[placeholder*='Country']")
    this.countryDropdownLoad =  page.locator(".ta-results")
    this.countryList =  page.locator(".ta-results .ta-item")
    this.placeOrder = page.locator('a[class*="submit"]')
}

    getPlaceholderTextEmailLocator(){
    return this.placeholderTextEmail
}

async searchAndAddCountry(countryName){

     await this.countryDropdownLocator.pressSequentially(countryName, {delay: 150})

     await this.countryDropdownLoad.waitFor()

   
   const countryCount = await this.countryList.count()

   for (let i=0; i<countryCount; i++){

      const countryReceived = await this.countryList.nth(i).textContent()

      if(countryReceived.trim()===countryName){

         await this.countryList.nth(i).click()
         break;
      }

   }

}

async clickOnPlaceOrder(){
    await this.placeOrder.click()
}


}
module.exports = {PlaceorderPage}




  
   
