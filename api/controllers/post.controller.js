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

export const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const setDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { category: req.query.slug }),
            ...(req.query.postId && { _Id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $option: 'i' } },
                    { content: { $regex: req.query.searchTerm, $option: 'i' } },
                ],
            }),
        })

            .sort({ UpdatedAt: setDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments();


        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });



    } catch (error) {
        next(error);
    }

};


export const deletePost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, "Only admin users can delete posts"));
    }
    try {
        console.log(req.params);
        const post = await Post.findByIdAndDelete(req.params.postId);
        console.log(post);
        if (!post) {
            return next(errorHandler(404, "Post not found"));
        }
        res.status(200).json(post);

    }
    catch (error) {
        next(error); s
    }

};
