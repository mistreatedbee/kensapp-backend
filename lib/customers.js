const Customer = require('../models/customer');
const Order = require('../models/order');

function customerQueryFromOrder(order) {
  if (order.customerPhone) return { phone: order.customerPhone };
  if (order.customerEmail) return { email: order.customerEmail.toLowerCase() };
  return { name: order.customerName };
}

async function recalculateCustomer(customer) {
  const query = customer.phone
    ? { customerPhone: customer.phone }
    : customer.email
      ? { customerEmail: customer.email }
      : { customerName: customer.name };
  const orders = await Order.find(query).sort({ createdAt: -1 });
  customer.orderCount = orders.length;
  customer.totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  customer.lastOrderDate = orders[0]?.createdAt;
  customer.orderIds = orders.map((order) => order._id);
  if (orders[0]?.address) customer.address = orders[0].address;
  await customer.save();
  return customer;
}

async function upsertCustomerFromOrder(order) {
  const query = customerQueryFromOrder(order);
  const update = {
    name: order.customerName,
    phone: order.customerPhone,
    email: order.customerEmail ? order.customerEmail.toLowerCase() : undefined,
    address: order.address,
  };
  let customer = await Customer.findOne(query);
  if (!customer) customer = new Customer(update);
  Object.assign(customer, update);
  return recalculateCustomer(customer);
}

async function recalculateCustomerForOrder(order) {
  const query = customerQueryFromOrder(order);
  const customer = await Customer.findOne(query);
  if (!customer) return null;
  return recalculateCustomer(customer);
}

module.exports = { upsertCustomerFromOrder, recalculateCustomerForOrder };
