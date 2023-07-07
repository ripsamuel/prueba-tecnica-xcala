import { useEffect } from "react";
import { fetchOrders } from "../../utils/orders";
import { saveOrder } from "../../utils/orders";

export default function OrdersComponent() {

  useEffect(() => {
    fetchOrders().then((validOrders) => {
      // validOrders.map(async (order) => {
      //   await saveOrder(order);
      // });
    });
  }, []);
}
