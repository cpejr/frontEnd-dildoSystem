import api from '../../services/api';

export async function getShippingOptions(products, cepDestino, userType) {
  const totalPrice = getTotalPrice(products, userType);
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
  const targetUrl = `http://api.frenet.com.br/shipping/quote`;

  try {
    const response = await fetch(proxyUrl + targetUrl, requestOptions);
    console.log(requestOptions)


    const formattedResponse = await response.json();
    console.log(formattedResponse);
    return formattedResponse;

  } catch (error) {
    console.error(error);
    return (error);
  }
}

export async function callPaymentAPI(products, address, shippingOptions, buyer) {
  const items = products.map(p => { //MONTA ARRAY DE PRODUTOS NO FORMATO DESEJADO
    return {
      Name: p.product.name,
      Description: p.product.description,
      UnitPrice: getProductPrice(p.product) * 100,
      Quantity: p.quantity,
      Type: "Asset",
      Sku: "",
      Weight: p.product.weight * 1000
    }
  });
  //console.log(items);

  const shippingServices = [];
  shippingOptions.forEach(sh => { //MONTA ARRAY DE FORMAS DE ENVIO NO FORMATO DESEJADO
    if (!sh.Error)
      shippingServices.push({
        Name: `${sh.ServiceDescription} - até ${sh.DeliveryTime} dias úteis`,
        Price: Number(sh.ShippingPrice),
        Deadline: Number(sh.DeliveryTime),
        Carrier: null
      })
  });
  console.log(shippingServices + "esse eh o shipping services");
  //console.log(buyer)
  let user;
  try {
    user = await api.get(`/user/${buyer.id}`, { headers: { authorization: `Bearer ${buyer.accessToken}` } });
    console.log(user);
    user = user.data;
  } catch (error) {
    console.error(error);
    return (error);
  }

  let orderID;
  try {
    orderID = await api.get('initializeOrder', { headers: { authorization: `Bearer ${buyer.accessToken}` } });
    orderID = orderID.data;
    console.log(orderID);
  } catch (error) {
    console.error(error);
    return (error);
  }



  const requestBody = {
    "OrderNumber": orderID,
    "SoftDescriptor": "LOJACASULUS",
    "Cart": {
      "Discount": {
        "Type": "Percent",
        "Value": 0
      },
      "Items": items
    },
    "Shipping": {
      "SourceZipCode": "31160430",
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
      "Installments": 10,
      "MaxNumberOfInstallments": 10
    },
    "Customer": {
      "Identity": String(user.cpf),
      "FullName": user.name,
      "Email": user.email,
      "Phone": user.phonenumber
    },
    "Options": {
      "AntifraudEnabled": true,
      "ReturnUrl": `https://lojacasulus.com.br/checkout/${orderID}`
    },
    "Settings": null
  }

  console.log(requestBody);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'MerchantId': 'dee08cb6-062c-4e77-bbaf-73bdc86b6af0'
    },
    body: JSON.stringify(requestBody)
  };
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `https://cieloecommerce.cielo.com.br/api/public/v1/orders`;

  try {
    const response = await fetch(proxyUrl + targetUrl, requestOptions);
    const formattedApiResponse = await response.json();
    const redirectURL = formattedApiResponse.settings.checkoutUrl;
    window.location.href = redirectURL;
  } catch (error) {
    console.error(error)
  }
}

function getTotalPrice(products, userType) {
  let totalPrice = 0;
  products.forEach(p => {
    totalPrice += getProductPrice(p.product, userType) * p.quantity;
  })
  return totalPrice;
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



