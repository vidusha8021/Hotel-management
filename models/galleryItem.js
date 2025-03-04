import mongoose from 'mongoose';

const galleryItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {   // Ensure lowercase here
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema); // Fixed typo
export default GalleryItem;
