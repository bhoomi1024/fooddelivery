import express from 'express';
import { AuthenticateUser } from './UserRoutes.js';
import { Authenticate } from './ResRoutes.js'
import { AuthenticateDel } from './DelRoutes.js'
import OrderModel from '../models/OrderModel.js';

const router = express.Router();

//Route to create a new order
router.post('/newOrder', AuthenticateUser, async (req, res) => {

    try {
        const { restaurant, paymentId, deliveryAddress, orderItems, totalAmount } = req.body;
        console.log("data", req.body);
        const order = new OrderModel({
            user: req.UserId,
            restaurant,
            paymentId,
            deliveryAddress,
            orderItems,
            totalAmount
        });

        const newOrder = await order.save();
        console.log(newOrder);
        if (newOrder) {
            res.status(200).json(newOrder);
        }
        else {
            res.status(400).json({ error: "Invalid order data" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Route to change order status
router.put('/updateOrder/:id', Authenticate, async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        const { orderStatus } = req.body;
        if (order) {
            order.orderStatus = orderStatus;
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Route to change order status by delivery man
router.put('/updateOrderStatus/:id', AuthenticateDel, async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        const { orderStatus } = req.body;
        if (order) {
            order.orderStatus = orderStatus;
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        }
        else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Route to get orders by restaurant Id

router.get('/getOrdersByResId/:id', Authenticate, async (req, res) => {
    try {
        const orders = await OrderModel.find({ restaurant: req.params.id })
            .select('-__v   -deliveryAddress')
            .populate('orderItems.item', 'dishName price')
            .populate('user', 'ownerName')
            .populate('paymentId', 'orderId')
            .populate('deliveryman', 'ownerName');

        if (orders) {
            res.status(200).json(orders);
        } else {
            console.log(error);
            res.status(404).json({ error: 'Orders not found' });
        }
    } catch (error) {

        res.status(500).json({ error: 'Internal server error' });
    }
});

//Route to get orders by deliveryman Id

router.get('/getOrdersByDelId/:id', AuthenticateDel, async (req, res) => {
    try {
        const orders = await OrderModel.find({ deliveryman: req.params.id })
            .select('-__v -user -restaurant -paymentId -deliveryAddress')
            .populate('orderItems.item', 'name price');
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ error: 'Orders not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default router;