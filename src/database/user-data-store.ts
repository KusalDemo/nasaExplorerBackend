import IUser from "../models/IUser";
import {User} from "../models/User";
import bcrypt from "bcrypt";

export const registerUser = async (user: User) => {

    try {
        const fetchedUser = await IUser.findOne({email: user.email});

        if (!fetchedUser) {
            const encryptedPassword = await bcrypt.hash(user.password, 7);
            const newUser = new User(user.name, user.email, encryptedPassword, user.articles, user.comments);

            let newestUser = await IUser.create(newUser);
            return newestUser;
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
            const isPasswordValid = await bcrypt.compare(user.password, fetchedUser.password);

            if (!isPasswordValid) {
                throw new Error("Invalid email or password (1)");
            }

            console.log(`Password match: ${isPasswordValid}`);
           /* const userPasswordEncrypted = await bcrypt.hash(user.password, 7);
            const passwordMatch = fetchedUser.password.trim() === userPasswordEncrypted;
            if (!passwordMatch) {
                throw new Error("Invalid email or password (2)");
            }*/
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



