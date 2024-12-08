import express from "express";
import { verifyToken } from '../utils/verifyUser.js'
import { CreateComment } from '../controllers/comment.controller.js';


const router = express.Router();

router.post('/create', verifyToken, CreateComment)

export default router;

