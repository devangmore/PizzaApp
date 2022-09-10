require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const connectDb = require("./app/config/db")
const session = require("express-session")
const flash = require('express-flash')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const passportInit = require("./app/config/pass")




mongoose.connect("mongodb://127.0.0.1:27017/PizzaApp1", { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});




//Defining Port Number ...
const PORT = process.env.PORT || 2000

//registering APP
const app = express()
//passport setup.....


//serving Static Views and content ...
app.use(express.static("public"))
//jsonsetting 
app.use(express.json())
//accpet data from url 
app.use(express.urlencoded({extended:false}))


// Session store
let mongoStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
})
//Session 
app.use(session({
    secret : "onething",
    resave :false,
    saveUninitialized :false,
    store : mongoStore
}))
app.use(flash())

passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


//registering templating Enginee...and setting up views ,...
app.use(expressLayouts)
app.set('views', path.join(__dirname,"/resources/views"))
app.set('view engine', 'ejs' )

//global Middleware
app.use((req,res,next)=>{
    if(req.session){
        res.locals.session = req.session
        res.locals.user = req.user
    console.log("req.session is ", req.session)
    next()

    }else{
        console.log("no session available")
        next()
    }
    
    // console.log("SES From SErVE.js",req.session.cart)
    
})
require("./routes/web")(app)


//Running Server and serve http requests...
app.listen(PORT, ()=>{
    console.log("server Has been started.... on Port,",PORT)
})