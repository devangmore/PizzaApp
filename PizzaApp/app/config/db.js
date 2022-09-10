const mongoose = require("mongoose")

const connectDb = async ()=>{
    try {
       const conn = await mongoose.connect("mongodb://127.0.0.1:27017/PizzaApp1",{
        useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true 
       })

       console.log("The Connection has been made....", conn.connection.host)
        
    } catch (error) {
        console.log(error)
    }

}

module.exports = connectDb