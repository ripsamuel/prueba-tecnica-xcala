import { useEffect } from "react";
import { getOrders, getProductBySKU } from "../../API/api";

export default function OrdersComponent() {
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        // console.log('productos -> ', products)

        const validOrders = returnValidOrder(orders);

        const productswSkuImg = [];
        validOrders.forEach(async (o) => {
          console.log('valid order ', o)
          o.items.forEach(async (p) => {
            const product = await getProductBySKU(p.item_product_sku);
            console.log(`valid products ${o.order_number} `, product)
            productswSkuImg.push(product);
            console.log('arreglo con los productos y skuImg ', productswSkuImg)


          })
        });
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  // Resto del código de tu componente...
}

function returnValidOrder(orders) {
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
        console.log(`item ${order_number} con ID o SKU inválido`);
      } else {
        totalPrice += price;
      }
    });

    // Verifica si la suma de los precios coincide con el total_order_value y todos los IDs y SKUs de productos son válidos
    if (isValid && totalPrice === total_order_value) {
      validOrders.push(order);
    }
  });

  console.log("validOrders", validOrders);
  return validOrders;
}