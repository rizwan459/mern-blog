import express from "express";
import { verifyToken } from '../utils/verifyUser.js'
import { CreateComment, getPostComments, likeComment } from '../controllers/comment.controller.js';


const router = express.Router();

router.post('/create', verifyToken, CreateComment)
router.get(`/getPostComments/:postId`, getPostComments)
router.put(`/likeComment/:commentId`, verifyToken, likeComment)


export default router;

