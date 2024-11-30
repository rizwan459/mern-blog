import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "Only admin users can create posts"));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Title and content are required fields"));
    }
    const slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try {
        const savePost = await newPost.save();
        res.status(201).json(savePost);

    }
    catch (error) {
        next(error);
    }
};
