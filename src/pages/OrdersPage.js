import React from "react";
import { useOrders } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import { FiRepeat, FiEye } from "react-icons/fi";
import "./OrdersPage.css";

const OrdersPage = () => {
  const { orders, cancelOrder } = useOrders();
  const { addToCart } = useCart();

  const formatPrice = (val) => {
    if (typeof val === "number" && !isNaN(val)) return val.toFixed(2);
    if (typeof val === "string" && !isNaN(Number(val))) return Number(val).toFixed(2);
    return "0.00";
  };

  const handleRepeatOrder = async (order) => {
    for (const item of order.order_items || []) {
      // Her ürünü sepete ekle (adet kadar eklemek isterseniz: for (let i = 0; i < item.quantity; i++) ...)
      await addToCart(item.product_id || item.product?.id || item.crud?.id);
    }
    alert("Ürünler sepete eklendi!");
  };

  const handleViewDetail = (order) => {
    alert("Detay sayfası yakında!");
  };

  return (
    <div>
      <div className="orders-page-main">
        <h2 className="orders-title">Sipariş Geçmişi</h2>
        {orders.length === 0 ? (
          <p>Henüz bir siparişiniz bulunmamaktadır.</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-card-header">
                  <div className="order-id">#{order.id}</div>
                  <div className={`order-status order-status-${order.status}`}>{order.status}</div>
                </div>
                <div className="order-card-body">
                  <div className="order-date">{new Date(order.created_at).toLocaleString()}</div>
                  <div className="order-total">Toplam: <span>{formatPrice(order.final_total ?? order.total ?? order.total_amount)} ₺</span></div>
                  <div className="order-products">
                    <ul>
                      {order.order_items?.map((item) => (
                        <li key={item.id}>
                          {item.product?.name || item.crud?.name || "Ürün yok"} × {item.quantity ?? 0} = {formatPrice((item.unit_price ?? 0) * (item.quantity ?? 0))} ₺
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="order-card-actions">
                  <button className="order-btn order-repeat-btn" onClick={() => handleRepeatOrder(order)}>
                    <FiRepeat style={{ marginRight: 6, fontSize: 18 }} /> Yeniden Sipariş Ver
                  </button>
                  <button className="order-btn order-detail-btn" onClick={() => handleViewDetail(order)}>
                    <FiEye style={{ marginRight: 6, fontSize: 18 }} /> Detayı Görüntüle
                  </button>
                  {["pending", "paid"].includes(order.status) && (
                    <button
                      className="order-btn order-cancel-btn"
                      onClick={() => cancelOrder(order.id)}
                    >
                      İptal Et
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
