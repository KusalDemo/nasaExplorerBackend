export class User {
    name: string;
    email: string;
    password: string;
    articles: string[];
    comments: string[];

    constructor(name:string, email:string, password:string, articles:string[], comments:string[]) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.articles = articles;
        this.comments = comments;
    }
}

