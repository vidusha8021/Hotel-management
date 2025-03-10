import express from 'express';
import { createRoom,deleteRooms,findRoomById,getRooms,updateRoom} from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/', createRoom);
roomRouter.delete('/:roomId', deleteRooms);
roomRouter.get('/:roomId', findRoomById);
roomRouter.get('/', getRooms);
roomRouter.put('/:roomId', updateRoom);

export default roomRouter;

