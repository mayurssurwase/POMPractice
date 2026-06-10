class LoginPage{

constructor(page){
    this.page = page
    this.userName = page.locator("#userEmail")
    this.password = page.locator("#userPassword")
    this.loginButton = page.locator("#login")
    

}

async navigateTopage(){
    await this.page.goto("https://rahulshettyacademy.com/client")
 
}


async validLogin(userName, password){
    
   await this.userName.fill(userName)
   await this.password.fill(password)
   await this.loginButton.click()
   

}

}
module.exports = {LoginPage}


