let cart = {
    addItem(product, product_quantity){
        let current_cart = JSON.parse(localStorage.getItem("cart"));
        console.log("CART: ", product, product_quantity);
        if(!current_cart){
            current_cart = [];
        } 
        localStorage.setItem("cart", JSON.stringify(current_cart));
},
deleteItem(){

}
};
export default cart
// localStorage.setItem() 