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
  const [orderFetched, setOrderFetched] = useState(undefined);
  const { orderNumber } = useParams();

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  const fetchDataFromFirestore = async () => {
    try {
      const collectionRef = collection(db, "test_#10");
      const q = query(collectionRef, where("order_number", "==", orderNumber));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const orderFetch = []
        orderFetch.push(doc.data())
        console.log("Order :", orderFetch);
        console.log('procesed', orderFetch.procesed)
      });

      // se agrega el ID de firebase al documento
      const documentsData = querySnapshot.docs.map((doc) => ({
        documentID: doc.id,
        procesed : '1',
        ...doc.data(),
      }));
      setOrderFetched(documentsData[0]);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
    }
  };

  const updateOrder = async (newOrder) => {
    try {
      const docRef = doc(db, "test_#10", orderFetched.documentID);
      console.log("actualizando ", orderFetched.documentID, newOrder, docRef);
      const updated = await updateDoc(docRef, newOrder);

      console.log("Documento actualizado correctamente", updated);
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }
  };

  const updateEnProceso = async () => {
    updateOrder({
      en_proceso: orderFetched.en_proceso = true,
      procesed : 2
    });
    alert(`tu orden esta En proceso :) refresca la pagina `)
  };

  const updateDespachado = async () => {
    updateOrder({
    
      despachado: orderFetched.despachado = true,
      procesed : 3

    });
    alert(`tu orden esta En proceso :) refresca la pagina`)

  };

  const updateEntregado = async () => {
    updateOrder({
      entregado: orderFetched.entregado = true,
    });
    alert(`tu orden esta En proceso :) refresca la pagina`)
  
  };

  const renderView = () => {
   
    if (orderFetched) {
      return (
        <div>
          {orderFetched?.items.map((i) => (
          <img
            key={i}
            className="w-24 h-24 "
            alt="sku img"
            src={i?.sku_img_src}
          />)
          )}
    
      </div>

        );
    } else {
      <p> recarga la pagina :(</p>;
    }
  };

  const renderButtons = () => (
    <div className="bg-slate-200">

      <div>
      {(() => {
      console.log('order -',orderFetched)

      if (orderFetched?.en_proceso || orderFetched?.entregado || orderFetched?.despchado) {
        return <div>
          <p>Estados de la orden :</p>
          
        
          </div>;
      } else {
        return <p>Estados de la orden no inicilizados</p>;
      }
    })()}
      </div>
      <button onClick={updateEnProceso} disabled={false}>
        En Proceso: 
        <span>{orderFetched?.en_proceso.toString()}</span>
      </button>

      <button onClick={updateDespachado} disabled={orderFetched?.en_proceso === false} >
        Despachado: {orderFetched?.despachado}
        <span>{orderFetched?.despachado.toString()}</span>
      </button>
      <button onClick={updateEntregado} disabled={orderFetched?.despachado === false}>
        Entregado: {orderFetched?.entregado}
        <span>{orderFetched?.entregado.toString()}</span>
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
