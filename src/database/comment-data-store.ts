import {Comment} from "../models/Comment";
import IComment from "../models/IComment";
import {addUserComment, deleteUserComment} from "./user-data-store";

export const addComment = async (comment: Comment) => {
    try{
        const savedComment = await IComment.create(comment);
        await addUserComment(comment.userId, savedComment._id);
        return savedComment
    }catch (error){
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}

export const getCommentsByArticleId = async (articleId: string) => {
    try{
        const comments = await IComment.find({articleId: articleId});
        return comments;
    }catch (error){
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}

export const deleteComment = async (commentId: string, userId: string) => {
    try{
        const deletedComment = await IComment.deleteOne({_id: commentId});
        await deleteUserComment(userId, commentId);
        return deletedComment;
    }catch (error){
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}

export const updateComment = async (commentId: string, comment: Comment) => {
    try{
        const updatedComment = await IComment.updateOne({_id: commentId}, comment);
        return updatedComment;
    }catch (error){
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}

export const getAllComments = async () => {
    try{
        const comments = await IComment.find();
        return comments;
    }catch (error){
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}


