const Order = require('../models/Order');

// Create Order
const createOrder = async (req, res) => {
  try {
    const {
      items,
      address,
      totalAmount,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty',
      });
    }

    if (!address) {
      return res.status(400).json({
        message: 'Address is required',
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      address,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash on Delivery',
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    console.log('Create order error:', error);

    res.status(500).json({
      message: 'Failed to place order',
      error: error.message,
    });
  }
};


// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log('Get orders error:', error);

    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};


// Get single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.log('Get order error:', error);

    res.status(500).json({
      message: 'Failed to fetch order',
      error: error.message,
    });
  }
};

//Delete Order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    // Only allow cancellation if order is still Placed
    if (order.orderStatus !== 'Placed') {
      return res.status(400).json({
        message: 'Order cannot be cancelled now',
      });
    }

    await Order.findByIdAndDelete(order._id);

    res.json({
      message: 'Order cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel order error:', error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  deleteOrder,
};