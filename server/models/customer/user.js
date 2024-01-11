const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    name: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // for example, require at least 8 characters
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // basic regex to validate email format
    },
    phone: {
        type: String,
        // required: true,
        default: ''
    },
    street: {
        type: String,
        // required: true,
        default: ''
    },
    apartment: {
        type: String,
        // required: true,
        default: ''
    },
    city: {
        type: String,
        // required: true,
        default: ''
    },
    zip: {
        type: String,
        // required: true,
        default: ''
    },
    country: {
        type: String,
        default: 'Pakistan',
    },
    isAdmin: {
        type: Boolean, 
        default: false
    }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
