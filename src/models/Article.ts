export class Article {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    likes: number;
    dislikes: number;
    usersLiked: string[];
    usersDisliked: string[];

    constructor(
        id: string,
        title: string,
        content: string,
        imageUrl: string,
        authorId: string,
        authorName: string,
        createdAt: string,
        likes: number = 0,
        dislikes: number = 0,
        usersLiked: string[] = [],
        usersDisliked: string[] = []
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.authorId = authorId;
        this.authorName = authorName;
        this.createdAt = createdAt;
        this.likes = likes;
        this.dislikes = dislikes;
        this.usersLiked = usersLiked;
        this.usersDisliked = usersDisliked;
    }
}
