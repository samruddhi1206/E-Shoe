const express = require('express');

const {
  createOrder,
  getMyOrders,
  getOrderById,
  deleteOrder,
} = require('../controllers/orderController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createOrder);

router.get('/my-orders', authMiddleware, getMyOrders);

router.get('/:id', authMiddleware, getOrderById);

router.delete('/:id', authMiddleware, deleteOrder);

module.exports = router;