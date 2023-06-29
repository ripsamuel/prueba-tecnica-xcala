import { getOrders, getProductBySKU } from "../API/api";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

export const fetchOrders = async () => {
  try {
    const orders = await getOrders();

    const validOrders = returnValidOrder(orders);
    const productsSkuImg = [];

    validOrders.forEach(async (o) => {
      o.items.forEach(async (p) => {
        const product = await getProductBySKU(p.item_product_sku);
        productsSkuImg.push(product);
      });
    });

    console.log("Arreglo con los productos y SKUImg", productsSkuImg);
    return validOrders;
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
  }
};

const returnValidOrder = (orders) => {
  const validOrders = [];
  orders.forEach((order) => {
    const { items, total_order_value, order_number } = order;

    let totalPrice = 0;
    let isValid = true;

    items.forEach((item) => {
      const { item_product_id, item_product_sku, item_value } = item;

      // Convierte el valor de item_value a un número
      const price = Number(item_value);

      if (
        !item_product_id || // Verifica si item_product_id es null o undefined
        item_product_id === "" || // Verifica si item_product_id es una cadena vacía
        item_product_id === 0 || // Verifica si item_product_id es 0
        item_product_id < 0 || // Verifica si item_product_id es negativo
        isNaN(price) || // Verifica si item_value no es un número válido
        !item_product_sku || // Verifica si item_product_sku es null o undefined
        item_product_sku === "" || // Verifica si item_product_sku es una cadena vacía
        item_product_sku === 0 || // Verifica si item_product_sku es 0
        item_product_sku < 0 // Verifica si item_product_sku es negativo
      ) {
        isValid = false;
        console.log(`Item ${order_number} con ID o SKU inválido`);
      } else {
        totalPrice += price;
      }
    });

    // Verifica si la suma de los precios coincide con el total_order_value y todos los IDs y SKUs de productos son válidos
    if (isValid && totalPrice === total_order_value) {
      // Agrega la propiedad "fetch_date" con la fecha actual en milisegundos
      order.fetch_date = Date.now();
      validOrders.push(order);
    }
  });

  console.log("Array con ordenes validas", validOrders);

  return validOrders;
};



const saveOrder = async (order) => {
  try {
    // Agrega la fecha y hora actual al pedido
    const timestamp = serverTimestamp();
    console.log("ordenes en saveorder", order);
    // Guarda el pedido en Firestore con los datos originales, los datos calculados y el timestamp
    await addDoc(collection(db, "ripsamuel_verified_orders"), {
      ...order,
      total_price_calculated: returnValidOrder(order),
      verification_timestamp: timestamp,
    });

    console.log("Pedido guardado en Firestore");
  } catch (error) {
    console.error("Error al guardar el pedido en Firestore:", error);
  }
};
