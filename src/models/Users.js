const {model, Schema} = require('mongoose');

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
})

UsersSchema.methods.toJSON = ()=> {
    const { password, _id, ...user } = this.toObject();
    user.uid = _id;

    return user;
}
module.exports = model('Users', UsersSchema)