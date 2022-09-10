
import axios from 'axios'
import Noty from 'noty'
let allBtn = document.querySelectorAll(".add-to-cart")
let cartCounter = document.getElementById("cart-counter")

const updateCart = (pizza)=>{

    axios.post("/update-cart", pizza).then(res=>{
    //  console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type : 'success',
            theme : 'mint',
            text: 'Your Pizza Added...',
            timeout: 2000,
        

        }).show();

    }).catch(e=>{
        console.log("e")
        new Noty({
            type : 'error',
            theme : 'mint',
            text: 'oops, we are not delivering right now...',
            timeout: 2000

        }).show();
    })

}


allBtn.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const pizza= JSON.parse((btn.dataset.pizza))
      updateCart(pizza)

    })
})