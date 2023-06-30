import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebase/firebaseConfig";

export default function OrderDetails() {
  const [detailFetch, setDetailFetch] = useState([]);
  const { orderNumber } = useParams();

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const collectionRef = collection(db, "samuel_orders_test");
        const q = query(
          collectionRef,
          where("order_number", "==", orderNumber)
        );
        const querySnapshot = await getDocs(q);
        const documentsData = querySnapshot.docs.map((doc) => doc.data());
        setDetailFetch(documentsData);
      } catch (error) {
        console.error("Error al obtener los documentos:", error);
      }
    };

    fetchDataFromFirestore();
  }, [orderNumber]);

  const handleEnProceso = async () => {
    try {
      const orderId = detailFetch[0].order_number; // Obtener el ID del pedido
      await updateDoc(doc(db, "samuel_orders_test", orderId), {
        en_proceso: true, // Actualizar el estado en_proceso a true
      });
      console.log("Estado actualizado: En Proceso");
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  // console.log('order ide de detailfetch', detailFetch.items[0].item_product_id)
  const handleDespachado = async () => {
    try {
      const orderId = detailFetch[0].order_number; // Obtener el ID del pedido
      await updateDoc(doc(db, "samuel_orders_test", orderId), {
        despachado: true, // Actualizar el estado despachado a true
      });
      console.log("Estado actualizado: Despachado");
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const handleEntregado = async () => {
    try {
      const orderId = detailFetch[0].order_number; // Obtener el ID del pedido
      await updateDoc(doc(db, "samuel_orders_test", orderId), {
        entregado: true, // Actualizar el estado entregado a true
      });
      console.log("Estado actualizado: Entregado");
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };
  // console.log('asdasd', detailFetch)

  // console.log('aaa', detailFetch[0].items[0].sku_img_src)


  return (
    <div>
      <div>
          <div className="flex justify-center m-10" key={detailFetch.item_product_id}>
          <p className="font-bold">
            {orderNumber}
          </p>
          </div>
        
        <div className="flex justify-center m-10">
          <img
              className="w-24 h-24 "
              alt="sku img"
              src={detailFetch[0].items[0].sku_img_src}
          />
        </div>
      </div>

      <div className="bg-black">
        <button onClick={handleEnProceso} disabled={detailFetch[0]?.en_proceso}>
          En Proceso
        </button>
        <button
          onClick={handleDespachado}
          disabled={!detailFetch[0]?.en_proceso || detailFetch[0]?.despachado}
        >
          Despachado
        </button>
        <button
          onClick={handleEntregado}
          disabled={!detailFetch[0]?.despachado || detailFetch[0]?.entregado}
        >
          Entregado
        </button>
      </div>
    </div>
  );
}
