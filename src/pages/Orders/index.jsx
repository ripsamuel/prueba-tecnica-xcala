import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

import ItemComponent from "../../components/ItemComponent";
import OrdersComponent from "../../components/OrdersComponent";
import { fetchOrders } from "../../utils/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [visibleOrders, setVisibleOrders] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const containerRef = useRef(null);

  useEffect(() => {
    fetchOrders().then((validOrders) => {
      setOrders(validOrders);
      setVisibleOrders(validOrders.slice(startIndex, endIndex + 1));
    });
  }, []);

  const loadMoreOrders = useCallback(() => {
    if (!isLoading && endIndex < orders.length - 1) {
      setIsLoading(true);
      const newStartIndex = endIndex + 1;
      const newEndIndex = endIndex + 5;

      setTimeout(() => {
        setVisibleOrders((prevOrders) => [
          ...prevOrders,
          ...orders.slice(newStartIndex, newEndIndex + 1),
        ]);
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
        setIsLoading(false);
      }, 500);
    }
  }, [isLoading, orders, endIndex]);

  const reverseOrder = () => {
    setVisibleOrders((prevOrders) => [...prevOrders].reverse());
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const handleScroll = useCallback(() => {
    if (
      containerRef.current &&
      containerRef.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      loadMoreOrders();
    }
  }, [loadMoreOrders]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section className="bg-red-100 grid grid-cols-1">
      <OrdersComponent />

      <div ref={containerRef}>

      {visibleOrders.map((item) => (
      <Link to={`/orders/${item.order_number}`} key={item.id} match={item.sku_img_src}>
        <ItemComponent order={item} />
      </Link>

  

    
    

    ))}

      
        {isLoading && <p>Loading...</p>}
      </div>

      <button onClick={reverseOrder}>
        Invertir orden ({sortOrder === "desc" ? "ascendente" : "descendente"})
      </button>
    </section>
  );
}
