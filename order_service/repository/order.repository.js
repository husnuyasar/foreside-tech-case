const Order = require('../models/order');
const MongoDB = require('./../config/database')

class OrderRepository {
    constructor() {
        MongoDB.connect();
    }
    async createOrder(orderData) {
        try {
          const newOrder = await Order.create(orderData);
          return newOrder;
        } catch (error) {
            throw new Error('Error creating order:', error);
        }
    }
      
    async getAll() {
        try {
            const orders = await Order.find();
            return orders.map(o=> {
                return {
                    id : o.id,
                    orderDetail : o.orderDetail,
                    startedAt : new Date(o.startedAt).toISOString(),
                    finishedAt : new Date(o.finishedAt).toISOString()
                }
            });
        } catch (error) {
            throw new Error('Failed to get all orders');
        }
        
    }   
    
    async  getLastOrderRecord() {
        try {
          const lastOrder = await Order.findOne({}, null, { sort: { startedAt: -1 } });
          if (lastOrder) {
            return lastOrder;
          } else {
            throw new Error('No orders found.');
          }
        } catch (error) {
            throw new Error('Error fetching last order:', error);
        }
      }
}
  
module.exports = new OrderRepository();