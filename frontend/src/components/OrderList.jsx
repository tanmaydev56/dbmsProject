import  { useEffect, useState } from 'react';
import { fetchOrders } from '../services/OrderServices';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
useEffect(() => {
  const getOrders = async () => {
    
    try {
      const orders = await fetchOrders();
      setOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  getOrders();
},[])


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">User ID</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Total Amount</th>
            <th className="px-4 py-2 text-left">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.order_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.order_id}</td>
                <td className="px-4 py-2">{order.user_id}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">${order.total_amount}</td>
                <td className="px-4 py-2">{new Date(order.order_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">No orders available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
