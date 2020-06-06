const bcrypt = require('bcrypt');
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
    create({password, token, ...rest}) {
        const user = new User({
            password: bcrypt.hashSync(password, 2),
            ...rest
        });
        // discard token, and similar fields that are meant for internal use
        return user.save()
    }
}

module.exports = new UserService();