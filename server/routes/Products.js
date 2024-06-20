

// routes/productRoutes.js
import express from 'express'
const router = express.Router()
import {
    createProduct, getAllProducts, getProduct, updateProduct, deleteProduct
} from '../controllers/productcon.js'

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router
