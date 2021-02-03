import mongoose from "mongoose";

const Time = mongoose.Schema({
    day: Number,
    startTime: Number,
    endTime: Number,
    sessionName: String
})

const Subject = mongoose.Schema({
    name: String,
    color: String,
    text_color: String,
    times: [Time]
})

const TodoItem = mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    complete: Boolean
})

const User = mongoose.Schema({
    email: {type: String, unique: true},
    displayName: String,
    password: String,
    subjects: {type: [Subject], required: false},
    todoList: {type: [TodoItem], required: false}
})

const UserModel = mongoose.model('User', User)
export default UserModel