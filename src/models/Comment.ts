export class Comment {
    id: string;
    articleId: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;

    constructor(
        id: string,
        articleId: string,
        userId: string,
        userName: string,
        content: string,
        createdAt: string
    ) {
        this.id = id;
        this.articleId = articleId;
        this.userId = userId;
        this.userName = userName;
        this.content = content;
        this.createdAt = createdAt;
    }
}
