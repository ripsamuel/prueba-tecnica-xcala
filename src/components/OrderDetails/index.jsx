import React, { useState, useEffect } from "react";

const OrderDetails = ({ item }) => {
  console.log('match',match)
  const [order, setOrder] = useState(null);

  // Función para obtener los detalles del pedido desde Firestore
  const fetchOrderDetails = async () => {
    const orderNumber = match.params.orderNumber;

    try {
      // Lógica para obtener los detalles del pedido desde Firestore
      await firebase.firestore().collection("orders").doc(orderNumber).update({
        order_state: "Despachado",
      });
      console.log("Pedido marcado como Despachado");
    } catch (error) {
      console.error("Error al obtener los detalles del pedido:", error);
    }
  };

  // Función para marcar el pedido como "Despachado"
  const markAsDispatched = async () => {
    const orderNumber = match.params.orderNumber;

    try {
      // Lógica para marcar el pedido como "Despachado" en Firestore
      // ...
    } catch (error) {
      console.error("Error al marcar el pedido como Despachado:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    
  }, []);

  setTimeout(() => {
   setOrder(true)
  }, 500);
  if (!order) {
    return <p>Cargando detalles del pedido...</p>;
  }

  return (
    <div>
      {/* Renderizar las validaciones y las imágenes de los SKU */}
      <img className="w-20 h-20" src={match.sku_img_src} alt="SKU Image" />


      {/* Botón "Despachado" */}
      <button onClick={markAsDispatched}>Despachar</button>
    </div>
  );
};

export default OrderDetails;
