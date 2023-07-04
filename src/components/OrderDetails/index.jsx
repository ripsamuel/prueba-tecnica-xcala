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
  const [orderFetched, setOrderFetched] = useState(null);
  const { orderNumber } = useParams();

  useEffect(() => {
    fetchDataFromFirestore();
  }, [orderNumber]);

  const fetchDataFromFirestore = async () => {
    try {
      const collectionRef = collection(db, "samuel_orders_test");
      const q = query(collectionRef, where("order_number", "==", orderNumber));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log("Document ID:", orderNumber);
        console.log("Document data:", doc.data());
      });

      const documentsData = querySnapshot.docs.map((doc) => ({
        documentID: doc.id,
        ...doc.data(),
      }));
      setOrderFetched(documentsData[0]);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
    }
  };

  const updateOrder = async (newOrder) => {
    try {
      const docRef = doc(db, "samuel_orders_test", orderFetched.documentID);
      console.log("actualizando ", orderFetched.documentID, newOrder, docRef);
      const updated = await updateDoc(docRef, newOrder);

      console.log("Documento actualizado correctamente", updated);
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }
  };

  const updateEnProceso = async () => {
    updateOrder({
      en_proceso: !orderFetched.en_proceso,
    });
  };

  const updateDespachado = async () => {
    updateOrder({
      despachado: orderFetched.despachado = true,
    });
  };

  const updateEntregado = async () => {
    updateOrder({
      entregado: orderFetched.entregado = true,
    });
  };

  const renderView = () => {
    if (orderFetched) {
      return orderFetched?.items.map((i) => (
        <img
          key={i}
          className="w-24 h-24 "
          alt="sku img"
          src={i?.sku_img_src}
        />
      ));
    } else {
      <p> recarga la pagina :(</p>;
    }
  };

  const renderButtons = () => (
    <div className="bg-slate-200">

      <div>
      {(() => {
      if (orderFetched?.en_proceso || orderFetched?.entregado || orderFetched?.despchado) {
        return <p>estado de la orden {
          orderFetched?.entregado.toString()
          }
          </p>;
      } else {
        return <p>Si no se cumple la condición</p>;
      }
    })()}
      </div>
      <button onClick={updateEnProceso}>
        En Proceso: {orderFetched?.en_proceso}
      </button>
      <button onClick={updateDespachado}>
        Despachado: {orderFetched?.despachado}
      </button>
      <button onClick={updateEntregado}>
        Entregado: {orderFetched?.despachado}
      </button>
    </div>
  );

  return (
    <div>
      <div>
        <div
          className="flex justify-center m-10"
          key={orderFetched?.item_product_id}
        >
          <p className="font-bold">{orderNumber}</p>
        </div>
        <div className="flex justify-center m-10">{renderView()}</div>
      </div>
      {renderButtons()}
    </div>
  );
}
