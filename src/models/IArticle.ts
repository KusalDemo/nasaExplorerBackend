import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    content: string;
    imageUrl: string;
    authorId: mongoose.Schema.Types.ObjectId;
    authorName: string;
    createdAt: Date;
    likes: number;
    dislikes: number;
    comments: mongoose.Schema.Types.ObjectId[];

}

const articleSchema = new Schema<IArticle>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model<IArticle>('Article', articleSchema);
