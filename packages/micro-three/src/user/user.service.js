const User = require('./user.model');
const Address = require('./address.model');

class UserService {
    all(params = {}, populate = false) {
        let _Users = User.find({
            ...params
        });
        if (populate) {
            _Users = _Users.populate('addresses')
        }
        return _Users;
    }
    one(params = {}, populate = false) {
        const isIdParam = Object.keys(params).length === 1 &&  params.id;
        let _User;
        if(isIdParam) {
            _User = User.findById(params.id);
        } else {
            _User = User.findOne({
                ...params
            });
        }
        if (populate) {
            _User = _User.populate('addresses')
        }
        return _User;
    }
    create({ token, ...rest}) {
        const user = new User({
            ...rest
        });
        // discard token, and similar fields that are meant for internal use
        return user.save()
    }
    update(id, { token, ...rest }){
        return User.findByIdAndUpdate(id, rest, { new: true });
    }
    remove(id) {
        return User.findByIdAndRemove(id);
    }

    async createAddress(id, payload) {
        const user = await User.findById(id);
        const address = new Address(payload);
        address.userId = user._id;
        await address.save();

        user.addresses.push(address._id);
        return user.save();
    }
    async updateAddress(id, subId, payload) {
        const user = await User.findById(id);
        return user && Address.findByIdAndUpdate(subId, payload);
    }
    async removeAddress(id, subId) {
        const user = await User.findById(id);
        return user && Address.findByIdAndRemove(subId)
    }
}

module.exports = new UserService();