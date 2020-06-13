const Order = require('./order.model');

class OrderService {
    all(params) {
        return Order.find(params);
    }
    one(params = {}) {
        const isIdParam = Object.keys(params).length === 1 &&  params.id;
        let _Order;
        if(isIdParam) {
            _Order = Order.findById(params.id);
        } else {
            _Order = Order.findOne({
                ...params
            });
        }
        return _Order;
    }
    create(params) {
        const order = new Order(params);
        return order.save()
    }
    update(id, { token, ...rest }){
        return Order.findByIdAndUpdate(id, rest, { new: true });
    }
    remove(id) {
        return Order.findByIdAndRemove(id);
    }
}

module.exports = new OrderService();