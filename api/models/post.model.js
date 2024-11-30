import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: 'https://www.brightvessel.com/wp-content/uploads/2024/03/how-to-set-default-blog-page.jpg', // Default post image if none provided by user
        },
        category: {
            type: String,
            default: 'uncategorized'
        },
        slug: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;