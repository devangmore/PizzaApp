//importing Controller
const homeController = require("../app/http/controllers/homeController")
const authController = require("../app/http/controllers/authController")
const customerController = require("../app/http/controllers/customerController/customerController")
const guest = require('../app/http/middlewares/guest')

const initRoute =(app)=>{
//requesting home page
app.get("/",homeController().homepage)

//login Page
app.get("/login", guest,authController().login)
//login Post credential
app.post("/login", authController().postLogin)
//register Page
app.get("/register", guest, authController().register)
//User do registers
app.post("/register", authController().postUser)
//logout 

app.post("/logout", authController().logout)
//addtocart and Update-cart
app.post("/update-cart", customerController().updateCart)
//orderSummaryPage;;
app.get("/cart", customerController().cart)}
module.exports = initRoute