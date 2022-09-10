//Importing Models
const Menu = require("../../models/menu")

const homeController = ()=>{
return{

    homepage: async (req,res)=>{ 
        const pizzas = await Menu.find()
        // console.log(pizzas)
        res.render("home",{pizzas})
    }

}

}

module.exports = homeController