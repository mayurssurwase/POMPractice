class OrderHistoryPage{

constructor(page){

    this.table = page.locator("tbody")
    this.row = page.locator("tbody tr")
    this.orderIDSummaryPage = page.locator("div .col-text")

}

async waitForTableToLoad(){
    await  this.table.first().waitFor()

}

async searchOrderIDAndClickOnView(orderID){
    

   for (let i=0 ; i< await this.row.count(); i++){

      const rowOrderID = await this.row.nth(i).locator("th").textContent()
      if(orderID.trim().includes(rowOrderID.trim())){

         await this.row.nth(i).getByRole('button', {name:'View'}).click()
         break;
      }
   }
}

async getTextOrderIDOnSummaryPage(){
    return await this.orderIDSummaryPage.textContent()

}


}
module.exports = {OrderHistoryPage}


