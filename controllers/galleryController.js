import GalleryItem from "../models/galleryItem.js";

export function createGalleryItems(req, res) {
    const galleryItem = req.body;

    const newGalleryItem = new GalleryItem(galleryItem);
    
    const user = req.user
    if(user == null){
        res.status(403).json({
            message : "Please login to add gallery items"
        })
        return
    }


    if(user.type != "admin"){
        res.status(403).json({
            message : "You are not authorized to add gallery items"
        })
        return
    }

    newGalleryItem.save()
        .then(() => {
            res.json({ 
                message: "Gallery item added successfully" });
        })
        .catch(() => {
            res.status(500).json({ 
                message: "Gallery item cration failed" });
        })
}


export function getGalleryItems(req, res) {
    GalleryItem.find()
        .then((galleryItems) => {
            res.json(galleryItems);
        })
        .catch(() => {
            res.status(500).json({ 
                message: "Gallery items not found" });
        })
}