import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage';
import { DashboardPage } from '../POM/DashboardPage';
import { CheckoutPage } from '../POM/CheckoutPage';
import { PlaceorderPage } from '../POM/PlaceorderPage';
import { OrderPlacedPage } from '../POM/OrderPlacedPage';
import { OrderHistoryPage } from '../POM/OrderHistoryPage';
import parameterizeddata from '../Test Data/E2EPOMParameterizeTestData.json'


for (let i of parameterizeddata){
test(`End to end flow for ${i.productName}`, async ({ page }) => {


   //Login Page
   const loginPage = new LoginPage(page)
   await loginPage.navigateTopage()
   await loginPage.validLogin(i.userName,i.password)

   //Dashboard Page

   

   const dashboardpage = new DashboardPage(page)
   await dashboardpage.searchAndaddProductToCart(i.productName)
   await dashboardpage.clickOnCartButton()

// Checkout Page

   const checkoutPage = new CheckoutPage(page)
   await checkoutPage.waitForCheckoutPageToLoad()
   await expect(checkoutPage.getCheckoutProductLocator(i.productName)).toBeVisible();
   await checkoutPage.clickOnCheckoutButton()

   //Place Order
   const placeOrderPage = new PlaceorderPage(page)
   await expect(placeOrderPage.getPlaceholderTextEmailLocator()).toHaveText(i.userName)

   await placeOrderPage.searchAndAddCountry(i.countryName)
   await placeOrderPage.clickOnPlaceOrder()

   //order Placed 

   const orderPlacedPage = new OrderPlacedPage(page)
   await expect(orderPlacedPage.getOrderPlacedLoacator()).toHaveText(" Thankyou for the order. ")
   const orderID = await orderPlacedPage.getOrderIDText()
   console.log(orderID)
   await orderPlacedPage.clickOnMyOrders()
   
  
   //Order History

   const orderHistoryPage = new OrderHistoryPage(page)
   await orderHistoryPage.waitForTableToLoad()
   await orderHistoryPage.searchOrderIDAndClickOnView(orderID)


   const orderIDSummaryPage = await orderHistoryPage.getTextOrderIDOnSummaryPage()
   console.log(orderIDSummaryPage)
   await expect(orderID.trim()).toContain(orderIDSummaryPage.trim())   

})
}