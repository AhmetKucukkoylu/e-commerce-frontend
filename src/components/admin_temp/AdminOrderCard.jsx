import React from "react";
import { useAdminOrders } from "../../context/AdminOrdersContext";
import { FiRefreshCw } from "react-icons/fi";
import "./AdminOrderCardModern.css";

const AdminOrderCard = ({ order }) => {
  const { updateOrderStatus } = useAdminOrders();

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateOrderStatus(order.id, newStatus);
  };

  return (
    <div className="admin-order-card-modern">
      <div className="admin-order-card-header">
        <h4>
          <span className="admin-order-id">Sipariş #{order.id}</span> – <span className="admin-order-user">{order.user?.name || "Kullanıcı Yok"}</span>
        </h4>
        <span className={`admin-order-status status-${order.status}`}>{order.status}</span>
      </div>
      <div className="admin-order-card-info">
        <span><strong>Tutar:</strong> {typeof order.total_amount === "number" ? order.total_amount.toFixed(2) : "-"} ₺</span>
        <span><strong>Tarih:</strong> {order.created_at ? new Date(order.created_at).toLocaleString("tr-TR") : "-"}</span>
      </div>
      <div className="admin-order-card-actions">
        <label htmlFor={`status-${order.id}`}>Durum: </label>
        <select
          id={`status-${order.id}`}
          value={order.status}
          onChange={handleStatusChange}
          className="admin-order-status-select"
        >
          <option value="hazırlanıyor">Hazırlanıyor</option>
          <option value="kargoya verildi">Kargoya Verildi</option>
          <option value="teslim edildi">Teslim Edildi</option>
          <option value="iptal edildi">İptal Edildi</option>
        </select>
      </div>
      <hr className="admin-order-divider" />
      <ul className="admin-order-items-list">
        {order.order_items?.map((item) => (
          <li key={item.id}>
            <span className="admin-order-item-name">{item.product?.name || "Ürün Yok"}</span> – <span className="admin-order-item-qty">{item.quantity} adet</span> – <span className="admin-order-item-price">{typeof item.product?.price === "number"
              ? (item.product.price * item.quantity).toFixed(2)
              : "-"} ₺</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrderCard;
