import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    articleId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    userName: string;
    content: string;
    createdAt: Date;
}

const commentSchema = new Schema<IComment>({
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IComment>('Comment', commentSchema);
