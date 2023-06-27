
export default function ItemComponent({order}) {
  return (
    <section className="bg-red-100 grid grid-cols-1 ">
        order_number: {order.order_number} <br />
        total_order_value: {order.total_order_value} <br />
        {order.items.map(i => (
            <>
              SKU: {i.item_product_sku}<br />
              item_product_id: {i.item_product_id}<br />
              item_value: {`$ ${i.item_value}`}<br />
              <img className="w-20 h-20
              " src={i.sku_img_src}></img>
            </>
        ))}
        <hr />
    </section>
  );
}
