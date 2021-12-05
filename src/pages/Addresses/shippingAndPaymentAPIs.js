import api from '../../services/api';

export async function getShippingOptions(products, cepDestino, userType) {
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

  const response = await api.post('frenet', freteData);

  return response.data;
}

export async function callPaymentAPI(products, address, shippingOptions, buyer) {
  const items = products.map(p => { //MONTA ARRAY DE PRODUTOS NO FORMATO DESEJADO
    return {
      Name: p.name,
      Description: p.description.length >= 256 ? p.description.slice(0, 255) : p.description,
      UnitPrice: Math.round(getProductPriceWODiscount(p, buyer.type) * 100),
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

  const cieloResponse = await api.post('cielolink', requestBody);
  console.log(cieloResponse.data)

  const redirectURL = cieloResponse.data.settings.checkoutUrl;
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
