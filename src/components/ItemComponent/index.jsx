import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ItemComponent = ({ order }) => {
  return (
    <section className="mx-auto py-2 px-4 font-semibold text-black font-mono">
      <div className="bg-slate-100 border-2 border--500 p-4">
        <p className="text-red-500 text-lg font-mono">Numero de orden: {order.order_number}</p>
        <p>Valor total de la orden: {order.total_order_value}</p>
        <p>TimeStamp: {order.fetch_date}</p>
        
        <Link
          to={{
            pathname:`/VerifiedOrders/${order.order_number}`,
        }}
          >
            <button>Ver Validaciones</button>

          </Link>
          

        {order.items.map((item) => (
          <div className="flex flex-col justify-start" key={item.item_product_id}>
            <p>SKU: {item.item_product_sku}</p>
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

ItemComponent.propTypes = {
  order: PropTypes.shape({
    order_number: PropTypes.string.isRequired,
    total_order_value: PropTypes.number.isRequired,
    fetch_date: PropTypes.instanceOf(Date).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        item_product_sku: PropTypes.string.isRequired,
        item_product_id: PropTypes.string.isRequired,
        item_value: PropTypes.number.isRequired,
        sku_img_src: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ItemComponent;
