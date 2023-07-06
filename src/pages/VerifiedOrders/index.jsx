import { useEffect, useState, useRef, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import ItemComponent from "../../components/ItemComponent";
import OrdersComponent from "../../components/OrdersComponent";
import { fetchOrders } from "../../utils/orders";
import AppLayout from "../../components/AppLayout";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [visibleOrders, setVisibleOrders] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    fetchOrders().then((validOrders) => {
      setOrders(validOrders);
      setVisibleOrders(validOrders.slice(startIndex, endIndex + 1));
    });

    fetchDataFromFirestore();
  }, []);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.order_number.toLowerCase().includes(search.toLowerCase())
      );
     
      const sortedData = filteredData.sort((a, b) => b.fetch_date - a.fetch_date);

      setVisibleOrders(sortedData);

  setVisibleOrders(filteredData);

  }, [data, search]);

  const fetchDataFromFirestore = async () => {
    try {
      const collectionRef = collection(db, "ripsamuel_verified_orders");
      const querySnapshot = await getDocs(collectionRef);
      const documentsData = querySnapshot.docs.map((doc) => doc.data());
      setData(documentsData);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
    }
  };

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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <AppLayout>
      <section className="bg-black  grid  rounded-2xl">
      <OrdersComponent />
      <div>
        <input
          type="text"
          placeholder="Busca tu producto"
          className="rounded-lg border border-black w-80 p-4 mb-10 mt-10 focus:outline-none"
          onChange={handleSearchChange}
        />
      </div>

      <div
      className=""
      ref={containerRef}>
        {visibleOrders.map((item) => (
            <ItemComponent order={item}
            key={item.id}
            />
        ))}

        {isLoading && <p>Loading...</p>}
      </div>

      <button onClick={reverseOrder}>
        Invertir orden ({sortOrder === "desc" ? "ascendente" : "descendente"})
      </button>
    </section>
    </AppLayout>
  );
}

export default Orders;
