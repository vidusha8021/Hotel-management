import express from 'express';
import { createCategory,deleteCategories,findCategory,getCategories, updateCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();
categoryRouter.post('/', createCategory);

categoryRouter.delete('/:name', deleteCategories);
categoryRouter.get('/', getCategories);
categoryRouter.get('/:name', findCategory);
categoryRouter.put('/:name', updateCategory);


export default categoryRouter;