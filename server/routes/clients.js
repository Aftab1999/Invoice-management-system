import express from 'express'
import { getClients, createClient, updateClient, deleteClient, getClientsByUser, getClient } from '../controllers/clients.js'

const router = express.Router()

router.get('/', getClients)
router.get('/user', getClientsByUser);
router.post('/', createClient)
router.patch('/:id', updateClient)
router.delete('/:id', deleteClient)


router.get('/:id', getClient); // Get a specific client by ID <-- Make sure this is added


// Comment by aftab
// router.get('/:id', getClientbyid);  





export default router