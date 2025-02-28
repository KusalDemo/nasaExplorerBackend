import IUser from "../models/IUser";
import {User} from "../models/User";

export const registerUser = async (user: User) => {

    try {
        const fetchedUser = await IUser.findOne({email: user.email});

        if (!fetchedUser) {
            /*const encryptedPassword = await bcrypt.hash(user.password, 10);*/
            const newUser = new User(user.name, user.email, user.password, user.articles, user.comments);

            await IUser.create(newUser);
            return newUser;
        } else {
            throw new Error(`User already exists`);
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}

export const loginUser = async (user: User) => {
    try {
        const fetchedUser = await IUser.findOne({email: user.email});

        if (fetchedUser) {
            /* const isPasswordValid = await bcrypt.compare(user.password, fetchedUser.password);*/
            console.log(`Fetched User password: ${fetchedUser.password} vs User password: ${user.password}`);
            const passwordMatch = fetchedUser.password === user.password;
            if (!passwordMatch) {
                throw new Error("Invalid email or password");
            }
            console.log(`User logged in successfully : ${fetchedUser}`);
            return fetchedUser;
        }
        return null;
    } catch (error) {
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}

export const updateUser = async (id:string, user: User) => {
    try{
        await IUser.updateOne({_id:id}, user);
        return user;
    }catch (error){
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}

export const addUserArticle = async (id:string, articleId: string | any ) => {
    try{
        const updatedUser = await IUser.findByIdAndUpdate(id,
            {
                $push: {articles: articleId},
            },
            {new: true}
        );
        if (!updatedUser) {
            throw new Error(`User with id : ${id} not found`);
        }
    }catch (error){
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}

export const addUserComment = async (id:string, commentId: string | any ) => {
    try{
        const updatedUser = await IUser.findByIdAndUpdate(id,
            {
                $push: {comments: commentId},
            },
            {new: true}
        );
        if (!updatedUser) {
            throw new Error(`User with id : ${id} not found`);
        }
    }catch (error){
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}

export const deleteUserComment = async (id:string, commentId: string | any ) => {
    try{
        const updatedUser = await IUser.findByIdAndUpdate(id,
            {
                $pull: {comments: commentId},
            },
            {new: true}
        );
        if (!updatedUser) {
            throw new Error(`User with id : ${id} not found`);
        }
    }catch (error){
        throw error instanceof Error ? error : new Error(`Error occurred: ${error}`);
    }
}



