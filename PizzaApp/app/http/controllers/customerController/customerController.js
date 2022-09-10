const customerController = ()=>{
    return {
        cart:(req,res)=>{
            res.render("customers/cart")
        },
        updateCart : (req,res)=>{

            // console.log("Recieved Req and session...", req.session.cart)

            //first Time If no session exist !
            if(!req.session.cart){
                req.session.cart = {
                    items  : {},
                    totalQty : 0,
                    totalPrice : 0,
                }
              
            }
            // //If Already Session Available 
            let cart = req.session.cart
            // console.log(cart)

            //Cheking if The Pizza is new ? if it is not then we simple create a new one with 
            //initial data
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item : req.body,
                    Qty : 1,
                }
                cart.totalQty += 1,
                cart.totalPrice += parseInt(req.body.price)
            }else{
                //if this pizza is already in cart then we just need to update qty and price and total qty
                cart.items[req.body._id].Qty +=1,
                cart.totalQty += 1,
                cart.totalPrice += parseInt(req.body.price) 
            }
        
            console.log("Cart in session",req.session.cart.items[req.body._id].item.image)
            console.log("cart right now ??",cart)
            return res.json({totalQty:cart.totalQty})
            // return res.json({msg:"green Signal"})
        }
    }
}

module.exports = customerController