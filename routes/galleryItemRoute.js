import express from 'express';
import { createGalleryItems, getGalleryItems } from '../controllers/galleryController.js'; 

const galleryItemRouter = express.Router();
galleryItemRouter.post('/', createGalleryItems); 
galleryItemRouter.get('/', getGalleryItems);


export default galleryItemRouter;
