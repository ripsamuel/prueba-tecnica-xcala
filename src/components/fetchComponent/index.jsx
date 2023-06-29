import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import db from "../../firebase/firebaseConfig";

export default  function FetchComponent () {
  const [data, setData] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      {data.map((document) => (
        <div key={document.id}>
          {/* Renderiza los datos del documento */}
          <p>{document.nombre}</p>
          <p>{document.descripcion}</p>
          {/* ...otros campos del documento */}
        </div>
      ))}
    </div>
  );
};

