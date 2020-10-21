let cart = {
    addItem(product, product_quantity) {
        console.log('produtos sendo passados: ',product, product_quantity)
        let products = [];
        if (localStorage.getItem('cart')) {
            products = JSON.parse(localStorage.getItem('cart'));
        }
        products.push({ 'product': product, 'quantity': product_quantity || 1 });
        localStorage.setItem('cart', JSON.stringify(products));
        
    },
    deleteItem(productId) {
        let storageProducts = JSON.parse(localStorage.getItem('cart'));
        let products = storageProducts.filter(product => product.product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(products));
    }
};
export default cart;
// localStorage.setItem()