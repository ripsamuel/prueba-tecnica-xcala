import { useEffect } from "react";
import { fetchOrders } from "../../utils/orders";
import { saveOrder } from "../../utils/orders";

export default function OrdersComponent() {
  // Resto del código de tu componente...

  useEffect(() => {
    fetchOrders().then((validOrders) => {
      validOrders.map(async (order) => {
        await saveOrder(order);
      });
    });
  }, []);

  // Resto del código de tu componente...
}
