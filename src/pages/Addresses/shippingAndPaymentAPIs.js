import api from '../../services/api';

export async function getShippingOptions(products, cepDestino, userType) {
  // console.log(products);
  const totalPrice = getTotalPrice(products, userType);
  const formattedProducts = products.map(p => {
    return {
      Weight: p.weight / 1000.0, // JÁ ESTÁ DIVIDIDO POR 100 PARA FICAR EM QUILOGRAMAS
      Height: p.height,
      Width: p.width,
      Length: p.length,
      Quantity: p.quantity
    }
  });
  const freteData = {
    SellerCEP: "75389334",
    RecipientCEP: cepDestino,
    ShipmentInvoiceValue: totalPrice, //MODIFICAR PARA PREÇO CORRETO
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
  const targetUrl = `https://api.frenet.com.br/shipping/quote`;


  const response = await fetch(proxyUrl + targetUrl, requestOptions);



  const formattedResponse = await response.json();

  return formattedResponse;

}

export async function callPaymentAPI(products, address, shippingOptions, buyer) {
  const items = products.map(p => { //MONTA ARRAY DE PRODUTOS NO FORMATO DESEJADO
    return {
      Name: p.name,
      Description: p.description,
      UnitPrice: getProductPriceWODiscount(p, buyer.type) * 100,
      Quantity: p.quantity,
      Type: "Asset",
      Sku: "",
      Weight: p.weight /* * 1000 */
    }
  });

  const shippingServices = [];
  shippingOptions.forEach(sh => { //MONTA ARRAY DE FORMAS DE ENVIO NO FORMATO DESEJADO
    if (!sh.Error)
      shippingServices.push({
        Name: `${sh.ServiceDescription} - até ${sh.DeliveryTime} dias úteis`,
        Price: Number(sh.ShippingPrice) * 100,
        Deadline: Number(sh.DeliveryTime),
        Carrier: null
      })
  });


  let user;

  user = await api.get(`/user/${buyer.id}`, { headers: { authorization: `Bearer ${buyer.accessToken}` } });

  user = user.data;

  let orderID;

  orderID = await api.get('initializeOrder', { headers: { authorization: `Bearer ${buyer.accessToken}` } });
  orderID = orderID.data;

  const discount = getTotalDiscount(products, buyer.type) * 100;
  // console.log(discount)

  const requestBody = {
    "OrderNumber": orderID,
    "SoftDescriptor": "LOJACASULUS",
    "Cart": {
      "Discount": {
        "Type": /* discount ? */ "Amount"/*  : "Percent" */,
        "Value": discount
      },
      "Items": items
    },
    "Shipping": {
      "SourceZipCode": "75389334",
      "TargetZipCode": address.zipcode,
      "Type": "FixedAmount",
      "Services": shippingServices,
      "Address": {
        "Street": address.street,
        "Number": address.number,
        "Complement": address.complement,
        "District": address.neighborhood,
        "City": address.city,
        "State": address.state
      }
    },
    "Payment": {
      "BoletoDiscount": 5,
      "DebitDiscount": 5,
      /* "Installments": null,
      "MaxNumberOfInstallments": null */
    },
    "Customer": {
      "Identity": String(user.cpf),
      "FullName": user.name,
      "Email": user.email,
      "Phone": user.phonenumber
    },
    "Options": {
      "AntifraudEnabled": false,
      "ReturnUrl": `https://lojacasulus.com.br/checkout/${orderID}`
    },
    "Settings": null
  }



  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'MerchantId': /* 'dee08cb6-062c-4e77-bbaf-73bdc86b6af0' */ '658dd7d2-2d89-40f8-92ee-886111da3b2d'
    },
    body: JSON.stringify(requestBody)
  };
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `https://cieloecommerce.cielo.com.br/api/public/v1/orders`;

  const response = await fetch(proxyUrl + targetUrl, requestOptions);

  const formattedApiResponse = await response.json();
  const redirectURL = formattedApiResponse.settings.checkoutUrl;
  window.location.href = redirectURL;

}

function getTotalPrice(products, userType) {
  let totalPrice = 0;
  products.forEach(p => {
    totalPrice += getProductPrice(p, userType) * p.quantity;
  })
  return totalPrice;
}

function getProductPriceWODiscount(product, userType) {
  if (userType === 'wholesaler') {
    return product.wholesaler_price;
  } else {
    return product.client_price;
  }
}

function getTotalDiscount(products, userType) {
  let totalPrice = getTotalPrice(products, userType);
  let totalPriceWODiscount = 0;
  products.forEach(prod => {
    if (userType === 'wholesaler') {
      totalPriceWODiscount += prod.wholesaler_price * prod.quantity;
    } else {
      totalPriceWODiscount += prod.client_price * prod.quantity;
    }
  });
  return totalPriceWODiscount - totalPrice;
}

function getProductPrice(product, userType) {
  if (userType === 'wholesaler') {
    if (product.on_sale_wholesaler) {
      return product.wholesaler_sale_price
    } else {
      return product.wholesaler_price
    }
  } else {
    if (product.on_sale_client) {
      return product.client_sale_price
    } else {
      return product.client_price
    }
  }
}



