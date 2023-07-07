import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase/firebaseConfig"; // Importa tu archivo de configuración de Firebase

export async function getOrders() {
  const ordersRef = collection(db, "orders");
  const ordersRef2 = collection(db, "test_#10");
  const querySnapshot = await getDocs(ordersRef2);

  const orders = [];
  querySnapshot.forEach((doc) => {
    orders.push(doc.data());
  });

  return orders;
}

export async function getProducts() {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(productsRef);

  const products = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });

  return products;
}

export async function getProductBySKU(productSKU) {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where('item_product_sku', '==', productSKU));
    const querySnapshot = await getDocs(q);

    const products = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return products;
  }
