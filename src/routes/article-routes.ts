import express from 'express';
import {
    addArticle,
    updateArticle,
    deleteArticle,
    getAllArticles,
    getArticlesByUserId,
} from '../database/article-data-store';
import { Article } from '../models/Article';

const articleRouter = express.Router();

articleRouter.post('/add', async (req, res) => {
    try {
        const article: Article = req.body;
        const newArticle = await addArticle(article);
        res.status(201).json(newArticle);
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        error instanceof Error
            ? res.status(400).send(error.message)
            : res.status(500).send(error);
    }
});

articleRouter.put('/update/:id', async (req, res) => {
    try {
        const articleId = req.params.id;
        const article: Article = req.body;
        const updatedArticle = await updateArticle(articleId, article);
        res.status(200).json(updatedArticle);
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        error instanceof Error
            ? res.status(400).send(error.message)
            : res.status(500).send(error);
    }
});

articleRouter.delete('/delete/:id', async (req, res) => {
    try {
        const articleId = req.params.id;
        const deletedArticle = await deleteArticle(articleId);
        res.status(200).json(deletedArticle);
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        error instanceof Error
            ? res.status(400).send(error.message)
            : res.status(500).send(error);
    }
});

articleRouter.get('/all', async (req, res) => {
    try {
        const articles = await getAllArticles();
        res.status(200).json(articles);
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        error instanceof Error
            ? res.status(400).send(error.message)
            : res.status(500).send(error);
    }
});


articleRouter.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const articles = await getArticlesByUserId(userId);
        res.status(200).json(articles);
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        error instanceof Error
            ? res.status(400).send(error.message)
            : res.status(500).send(error);
    }
});

export default articleRouter;