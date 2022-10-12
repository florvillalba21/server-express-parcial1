const {model, Schema} = require('mongoose');

const TasksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'Users'
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('Tasks', TasksSchema)