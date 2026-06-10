import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage';
import { DashboardPage } from '../POM/DashboardPage';
import { CheckoutPage } from '../POM/CheckoutPage';
import { PlaceorderPage } from '../POM/PlaceorderPage';
import { OrderPlacedPage } from '../POM/OrderPlacedPage';
import { OrderHistoryPage } from '../POM/OrderHistoryPage';



test(" End to end flow", async ({ page }) => {

   //Login Page
   const userName = "mayurssurwase@gmail.com"
   const password = "Mayur@123"
   
   //Login Page
   const loginPage = new LoginPage(page)
   await loginPage.navigateTopage()
   await loginPage.validLogin(userName,password)

   //Dashboard Page

   const productName = "ZARA COAT 3"

   const dashboardpage = new DashboardPage(page)
   await dashboardpage.searchAndaddProductToCart(productName)
   await dashboardpage.clickOnCartButton()

// Checkout Page

   const checkoutPage = new CheckoutPage(page)
   await checkoutPage.waitForCheckoutPageToLoad()
   await expect(checkoutPage.getCheckoutProductLocator(productName)).toBeVisible();
   await checkoutPage.clickOnCheckoutButton()

   //Place Order
   const placeOrderPage = new PlaceorderPage(page)
   await expect(placeOrderPage.getPlaceholderTextEmailLocator()).toHaveText(userName)
   const countryName = "India"
   await placeOrderPage.searchAndAddCountry(countryName)
   await placeOrderPage.clickOnPlaceOrder()

   //order Placed 

   const orderPlacedPage = new OrderPlacedPage(page)
   await expect(orderPlacedPage.getOrderPlacedLoacator()).toHaveText(" Thankyou for the order. ")
   const orderID = await orderPlacedPage.getOrderIDText()
   console.log(orderID)
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