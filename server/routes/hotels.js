import express from 'express';

import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
} from '../controllers/hotel.js';

import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create
router.post('/', verifyAdmin, createHotel);

// Update
router.put('/:id', verifyAdmin, updateHotel);

// Delete
router.delete('/find/:id', verifyAdmin, deleteHotel);

// Get
router.get('/:find/:id', getHotel);

// Get all
router.get('/', getAllHotels);

// count by city
router.get('/countByCity', countByCity);

// count by type
router.get('/countByType', countByType);

export default router;
