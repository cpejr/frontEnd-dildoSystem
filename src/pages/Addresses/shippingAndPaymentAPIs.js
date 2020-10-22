export async function getShippingOptions(products, cepDestino, userType) {
  let totalPrice = 0;
  const formattedProducts = products.map(p => {
    return {
      Weight: p.product.weight,
      Height: p.product.height,
      Width: p.product.width,
      Length: p.product.length,
      Quantity: p.quantity
    }
  });
  const freteData = {
    SellerCEP: "31150220",
    RecipientCEP: cepDestino,
    ShipmentInvoiceValue: 320.685,
    ShippingServiceCode: null,
    ShippingItemArray: formattedProducts,
    RecipientCountry: "BR"
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': '141A8046RB13FR4AE0R9085RD085090B7777'
    },
    body: JSON.stringify(freteData)
  };
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `http://api.frenet.com.br/shipping/quote`;

  try {
    const response = await fetch(proxyUrl + targetUrl, requestOptions);

    const formattedResponse = await response.json();
    return formattedResponse;
    
  } catch (error) {
    console.log(error);
    return(error);
  }
  
}