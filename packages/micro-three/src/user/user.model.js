const bcrypt = require('bcrypt');
const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    imageUrl : {
        type: String,
        default: ''
    },
    activated: {
        type: Boolean,
        default: true
    },
    roles: {
        type: [ String ],
        default: [ 'ROLE_USER' ] // [ "ROLE_USER", "ROLE_ADMIN" ]
    },
    token:{
        type:String
    },
    addresses:[
        {
            ref: 'Address',
            type: Schema.Types.ObjectId
        }
    ],
    createdAt    :{ type: Date },
    updatedAt    :{ type: Date, default: Date.now }
}, { versionKey: false }, {strict: false});

UserSchema.virtual('fullName').
  get(function() {
    return this.name.first + ' ' + this.name.last;
  }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

// UserSchema.virtual('id').get(function() {
//     return this._id.toHexString();
// })

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
})

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}


module.exports = model('User', UserSchema);