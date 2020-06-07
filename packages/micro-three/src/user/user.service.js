const User = require('./user.model');

class UserService {
    all(params) {
        return User.find({
            ...params
        })
    }
    one(params) {
        return User.findOne({
            ...params
        })
    }
    create({ token, ...rest}) {
        const user = new User({
            ...rest
        });
        // discard token, and similar fields that are meant for internal use
        return user.save()
    }
}

module.exports = new UserService();