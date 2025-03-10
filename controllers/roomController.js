import room from '../models/room.js';
import { isValidAdmin } from './userController.js';

export function createRoom(req, res) {
    if (!isValidAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to add rooms"
        })
        return
    }

    const newRoom = new room(req.body);
    newRoom.save()
        .then((result) => {
            res.json({
                message: "Room added successfully",
                result: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Room creation failed",
                error: err
            });
        })
}

export function deleteRooms(req, res) {
    if (!isValidAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to delete rooms"
        })
        return
    }
    const roomId = req.params.roomId
    room.deleteOne({ roomIde: roomId })
        .then(() => {
            res.json({
                message: "Room deleted successfully"
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "Room deletion failed"
            });
        })
}


export function findRoomById(req, res) {
    const roomId = req.params.roomId
    room.findOne({ roomId: roomId })
        .then((result) => {
            if (result == null) {
                res.status(404).json({
                    message: "Room not found"
                })
                return
            } else
                res.json({
                    message: "Room found",
                    result: result
                })

        }).catch(() => {
            res.status(500).json({
                message: "Room not found"
            })
        })

}

export function getRooms(req, res) {
    room.find()
        .then((rooms) => {
            res.json(rooms);
        })
        .catch(() => {
            res.status(500).json({
                message: "Rooms not found"
            });
        })
}

export function updateRoom(req, res) {
    if (!isValidAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update rooms"
        })
        return
    }

    const roomId = req.params.roomId
    room.updateOne({ roomId: roomId }, req.body)
        .then(() => {
            res.json({
                message: "Room updated successfully"
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "Room update failed"
            });
        })
}