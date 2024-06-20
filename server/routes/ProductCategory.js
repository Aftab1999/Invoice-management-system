// routes/productCategoryRoutes.js
import express from 'express'
const router = express.Router()
// import { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } from '../controllers/productCategoryController'
import { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } from '../controllers/productcat.js'


router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router


