import { useEffect } from "react";
import { fetchOrders } from "../../utils/orders"

export default function OrdersComponent() {
  // Resto del código de tu componente...

  useEffect(() => {
    fetchOrders()
    .then((validOrders) => {
      // validOrders.forEach(o => saveOrder(o))
    });
  }, []);
}


