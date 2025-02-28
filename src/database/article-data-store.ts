import IArticle from "../models/IArticle";
import { Article } from "../models/Article";
import {addUserArticle} from "./user-data-store";

export const addArticle = async (article: Article) => {
    try {
        const newArticle = new Article(
            article.id,
            article.title,
            article.content,
            article.imageUrl,
            article.authorId,
            article.authorName,
            new Date().toISOString(),
            article.likes,
            article.dislikes,
            article.comments
        );

        const savedArticle = await IArticle.create(newArticle);
        await addUserArticle(article.authorId,newArticle.id);
        return savedArticle;
    } catch (error) {
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
};

export const updateArticle = async (id: string, article: Article) => {
    try {
        const updatedArticle = await IArticle.findByIdAndUpdate(
            id,
            {
                title: article.title,
                content: article.content,
                imageUrl: article.imageUrl,
                authorId: article.authorId,
                authorName: article.authorName,
                likes: article.likes,
                dislikes: article.dislikes,
            },
            { new: true }
        );

        if (!updatedArticle) {
            throw new Error(`Article with id: ${id} not found`);
        }
        return updatedArticle;
    } catch (error) {
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
};

export const deleteArticle = async (id: string) => {
    try {
        const deletedArticle = await IArticle.findByIdAndDelete(id);
        if (!deletedArticle) {
            throw new Error(`Article with id: ${id} not found`);
        }
        return deletedArticle;
    } catch (error) {
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
};

export const getAllArticles = async () => {
    try {
        const articles = await IArticle.find();
        return articles;
    } catch (error) {
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
};

export const getArticlesByUserId = async (userId: string) => {
    try {
        const articles = await IArticle.find({ authorId: userId });
        return articles;
    } catch (error) {
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
};

export const thumbsUpArticle = async (articleId: string) => {
    try {
        const article = await IArticle.findById({_id: articleId}, {$inc: {likes: 1}});
        if (!article) {
            throw new Error(`Article with id: ${articleId} not found`);
        }
        return article;
    } catch (error) {
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
};

export const thumbsDownArticle = async (articleId: string) => {
    try {
        const article = await IArticle.findById({_id: articleId}, {$inc: {dislikes: 1}});
        if (!article) {
            throw new Error(`Article with id: ${articleId} not found`);
        }
        return article;
    } catch (error) {
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
};
