import category from '../models/category.js';
import {isValidAdmin} from './userController.js';

 export function createCategory(req, res) {
    if(req.user == null){
        res.status(403).json({
            message : "Please login to add categories"
        })
        return
    }if(req.user.type != "admin"){
        res.status(403).json({
            message : "You are not authorized to add categories"
        })
        return
    }
    const newCategory = new category(req.body);
    newCategory.save()
        .then((result) => {
            res.json({ 
                message: "Category added successfully",
            result:result
            });
        })
        .catch((err) => {
            res.status(500).json({ 
                message: "Category cration failed", 
                error:Error
            });
        })      
}

export function deleteCategories(req, res) {   
    if(req.user == null){
        res.status(403).json({
            message : "Please login to delete categories"
        })
        return
    }if(req.user.type != "admin"){
        res.status(403).json({
            message : "You are not authorized to delete categories"
        })
        return
    }
    const name = req.params.name
    category.deleteOne({name:name})
        .then(() => {
            res.json({ 
                message: "Category deleted successfully" });
        })
        .catch(() => {
            res.status(500).json({ 
                message: "Category deletion failed" });
        })
}

export function getCategories(req, res) {
    category.find()
        .then((categories) => {
            res.json(categories);
        })
        .catch(() => {
            res.status(500).json({ 
                message: "Categories not found" });
        })
}

export function findCategory(req, res) {
    const name = req.params.name
    category.findOne({name:name})
        .then((category) => {
            res.json(category);
        })
        .catch(() => {
            res.status(500).json({ 
                message: "Category not found" });
        })
}

export function updateCategory(req, res) {
    if(!isValidAdmin(req)){
        res.status(403).json({
            message : "You are not authorized to update categories"
        })
        return
    }

    const name = req.params.name
    category.findOneAndUpdate({name:name},req.body)
        .then(() => {
            res.json({ 
                message: "Category updated successfully" });
        })
        .catch(() => {
            res.status(500).json({ 
                message: "Category updation failed" });
        })
}

