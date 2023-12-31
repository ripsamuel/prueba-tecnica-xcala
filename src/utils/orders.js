import { getOrders, getProductBySKU } from "../API/api";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

export const fetchOrders = async () => {
  try {
    const orders = await getOrders();
    const validOrders = returnValidOrder(orders);
    const productsSkuImg = [];

    for (const o of validOrders) {
      for (const p of o.items) {
        const product = await getProductBySKU(p.item_product_sku);
        productsSkuImg.push(product);
      }
    }

    return validOrders;
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
  }
};


const returnValidOrder = (orders) => {
  const validOrders = [];

    if (Array.isArray(orders)) {
      orders.forEach((order) => {
        const { items, total_order_value } = order;
        let totalPrice = 0;
        let isValid = true;

        items.forEach((item) => {
          const { item_product_id, item_product_sku, item_value } = item;

          // Convierte el valor de item_value a un número
          const price = Number(item_value);

          if (
            !item_product_id ||
            item_product_id === "" ||
            item_product_id === 0 ||
            item_product_id < 0 ||
            isNaN(price) ||
            !item_product_sku ||
            item_product_sku === "" ||
            item_product_sku === 0 ||
            item_product_sku < 0
          ) {
            isValid = false;
          } else {
            totalPrice += price;
          }
        });

        if (isValid && totalPrice === total_order_value) {
          order.fetch_date = Date.now();
          validOrders.push(order);
          return validOrders
        }
      });
      console.log('ordenes validadas', validOrders)
    } else {
      const ordersArray = Object.values(orders);
      ordersArray.forEach((order) => {
        const { items, total_order_value } = order;

        let totalPrice = 0;
        let isValid = true;
        items.forEach((item) => {
          const { item_product_id, item_product_sku, item_value } = item;

          // Convierte el valor de item_value a un número
          const price = Number(item_value);

          if (
            !item_product_id ||
            item_product_id === "" ||
            item_product_id === 0 ||
            item_product_id < 0 ||
            isNaN(price) ||
            !item_product_sku ||
            item_product_sku === "" ||
            item_product_sku === 0 ||
            item_product_sku < 0
          ) {
            isValid = false;
          } else {
            totalPrice += price;
          }
        });

        if (isValid && totalPrice === total_order_value) {
          console.log('validacion')
          order.fetch_date = Date.now();
          validOrders.push(order);
        }
      });
    }

  return validOrders;
};

// ...

export const saveOrder = async (order) => {
  try {
    const timestamp = serverTimestamp();
    await addDoc(collection(db, "test_#10"), {
      total_price_calculated: order,
      en_proceso: false,
      despachado: false,
      entregado: false,
      ...order,
      verification_timestamp: timestamp,
    });

    console.log("Pedido guardado en Firestore");
  } catch (error) {
    console.error("Error al guardar el pedido en Firestore:", error);
  }
};
