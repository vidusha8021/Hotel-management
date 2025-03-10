import mongoose from "mongoose";    

const roomSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },category: {
        type: String,
        required: true
    },available: {
        type: Boolean,
        required: true,
        default: true
    },maxGuests: {
        type: Number,
        required: true,
        default: 3
    },photos: [
        {
        type: String,
        }
    ],specialDescription:
    {
        type: String,
        default: ""
    },
    notes: {
        type: String,
        default: ""
    },
});

const room = mongoose.model('room', roomSchema);
export default  room;