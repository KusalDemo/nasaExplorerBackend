import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    articles: mongoose.Schema.Types.ObjectId[];
    comments: mongoose.Schema.Types.ObjectId[];
}

let userSchema = new Schema<IUser>({
    name: {type:String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
});


export default mongoose.model<IUser>('User', userSchema);