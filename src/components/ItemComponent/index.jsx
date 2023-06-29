import React from "react";

const ItemComponent = ({ order  }) => {
  return (
    <section className="container mx-auto bg-red-100">
      <div className="bg-blue-100 border-2 border-red-500">
        <p>Numero de orden: {order.order_number}</p>
        <p>Valor total de la orden: {order.total_order_value}</p>
        {order.items.map((item) => (
          <div className="" key={item.item_product_id}>
            <p>SKU: {item.item_product_sku}</p>
            <p>Fecha: {item.fetch_date}</p>
            <p>Item Product ID: {item.item_product_id}</p>
            <p>Item Value: ${item.item_value}</p>
            <img className="w-20 h-20" src={item.sku_img_src} alt="SKU Image" />
            {/* Agregar validaciones aquí */}
          </div>
        ))}
      </div>
      <hr />
    </section>
  );
};

export default ItemComponent;
