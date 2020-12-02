let cart = {
    addItem(product, product_quantity, subproduct_id) {

        let id_found = false;
        let products = [];
        if (localStorage.getItem('cart')) {
            products = JSON.parse(localStorage.getItem('cart'));
        }
        for (var i = 0; i < products.length; i++) {
            if (product.id === products[i].product_id && subproduct_id && subproduct_id === products[i].subproduct_id) {
                id_found = true;
                products[i].quantity += product_quantity;
                let new_products = products.filter(product => product.subproduct_id == subproduct_id);
                localStorage.setItem('cart', JSON.stringify(new_products));
                break;
            }
            if (!subproduct_id && product.id === products[i].product_id) {
                id_found = true;
                products[i].quantity += product_quantity;
                let new_products = products.filter(product => product.product_id !== product.id);
                localStorage.setItem('cart', JSON.stringify(new_products));
                break;
            }
        }
        if (!id_found) {
            products.push({ 'product_id': product.id, 'quantity': product_quantity || 1, 'subproduct_id': subproduct_id });
            localStorage.setItem('cart', JSON.stringify(products));
        }

    },
    deleteItem(productId) {
        let storageProducts = JSON.parse(localStorage.getItem('cart'));
        let products = storageProducts.filter(product => product.product_id !== productId);
        localStorage.setItem('cart', JSON.stringify(products));
    }
};
export default cart;