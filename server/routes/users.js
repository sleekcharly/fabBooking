import express from 'express';

import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// // check authentication
// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.send('hello user, you are logged in');
// });

// // check authorized user
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.send('hello user, you are logged in and you can delete your account');
// });

// // check if user is admin
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   res.send('Hello admin, you are logged in and you can delete all accounts');
// });

// Update
router.put('/:id', verifyUser, updateUser);

// Delete
router.delete('/:id', verifyUser, deleteUser);

// Get
router.get('/:id', verifyUser, getUser);

// Get all
router.get('/', verifyAdmin, getAllUsers);

export default router;
