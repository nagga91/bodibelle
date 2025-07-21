import { useEffect, useState } from "react";
import "./orderTable.scss";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";

function OrdersPage() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    api
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(t("errors.fetchOrders"), err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    api
      .patch(`/orders/${orderId}/status`, { status: newStatus })
      .then(() => fetchOrders())
      .catch((err) => console.error(t("errors.updateStatus"), err));
  };

  const handleDelete = (orderId) => {
    if (window.confirm(t("confirm.deleteOrder"))) {
      api
        .delete(`/orders/${orderId}`)
        .then(() => {
          fetchOrders();
        })
        .catch((err) => {
          console.error(t("errors.deleteOrder"), err);
          alert(t("errors.deleteOrderAlert"));
        });
    }
  };

  return (
    <div className="table-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>{t("table.no")}</th>
            <th>{t("table.fullName")}</th>
            <th>{t("table.email")}</th>
            <th>{t("table.phone")}</th>
            <th>{t("table.address")}</th>
            <th>{t("table.products")}</th>
            <th>{t("table.totalPrice")}</th>
            <th>{t("table.status")}</th>
            <th>{t("table.date")}</th>
            <th>{t("table.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const client = order.clientInfo;
            const items = order.cart?.items || [];

            return (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{client.name} {client.lastName}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.address}</td>
                <td>
                  <ul>
                    {items.map((item, idx) => (
                      <li key={idx}>
                        {item.product?.name || t("table.deletedProduct")} — x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.totalPrice.toFixed(2)} DT</td>
                <td>
                  <select
                    value={order.status}
                    className={`status-select ${order.status}`}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="pending">{t("status.pending")}</option>
                    <option value="confirmed">{t("status.confirmed")}</option>
                    <option value="cancelled">{t("status.cancelled")}</option>
                  </select>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(order._id)}>🗑️</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
