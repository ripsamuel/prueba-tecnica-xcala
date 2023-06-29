import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";

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

  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  // Searched items/ Get products
  const filteredItemsById = (visibleOrders, search) => {
    return visibleOrders.filter((order) =>
      order.order_number.toLowerCase().includes(search.toLowerCase())
    );
  };
  console.log(
    "items filtrados por ID",
    filteredItemsById(visibleOrders, search)
  );

  const containerRef = useRef(null);

  useEffect(() => {
    fetchOrders().then((validOrders) => {
      setOrders(validOrders);
      setVisibleOrders(validOrders.slice(startIndex, endIndex + 1));
    });

    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "ripsamuel_verified_orders");
        const querySnapshot = await getDocs(collectionRef);
        const documentsData = querySnapshot.docs.map((doc) => doc.data());
        setData(documentsData);
      } catch (error) {
        console.error("Error al obtener los documentos:", error);
      }
    };
    fetchData();
    console.log("datos del fetch", data);
    
  }, []);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.order_number.toLowerCase().includes(search.toLowerCase())
    );
    setVisibleOrders(filteredData);
  }, [data, search]);

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
      <div>
        <input
          type="text"
          placeholder="Busca tu producto"
          className="rounded-lg border border-black w-80 p-4 mb-10 focus:outline-none"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div ref={containerRef}>
        {visibleOrders.map((item) => (
          <Link
            to={`/VerifiedOrders/${item.order_number}`}
            key={item.id}
            match={item.sku_img_src}
          >
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
