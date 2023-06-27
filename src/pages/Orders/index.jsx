import { useEffect, useState } from "react";
import ItemComponent from "../../components/ItemComponent";
import OrdersComponent from "../../components/OrdersComponent";
import { fetchOrders } from "../../utils/orders"

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders()
        .then((validOrders) => {
            setOrders(validOrders)
        });
    }, []);

  return (
    <section className="bg-red-100 grid grid-cols-1">
      <OrdersComponent />

      {orders.map((item) => (
        <ItemComponent key={item.id} order={item} />
      ))}
      <div> asdasd c</div>
      <div> asdasd c</div>
    </section>
  );
}
