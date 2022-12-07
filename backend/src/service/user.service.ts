import { HttpErrorException } from "exceptions/HttpErrorException";
import { IIssue } from "interfaces/issue.interface";
import { IUserInput } from "interfaces/user.interface";
import BookModel from "models/Book.model";
import Issue from "models/Issue.model";
import UserModel, { UserDocument } from "models/User.model";
import mongoose from "mongoose";
import { logger } from "utils/logger";

export async function findUser(username: string) {
    logger.info("Search for user");
    const userRecord: UserDocument = await UserModel.findOne<UserDocument>({ username });

    if (!userRecord) throw HttpErrorException.resourceNotFound("User not found");
    logger.info("User found");

    // Remove password property from the user object
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");

    return user;
}

/* Add user to the database */
export async function createUser({ name, password, username }: IUserInput) {
    try {
        const userRecord = await UserModel.create<IUserInput>({ name, password, username });

        const user = userRecord.toObject();
        // Remove password property from user
        Reflect.deleteProperty(user, "password");

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function loginUser({ username, password }: { username: string, password: string }) {
    try {
        const userRecord = await UserModel.findOne<UserDocument>({ username });
        if (!userRecord) return HttpErrorException.unAuthorized("Username not found");

        logger.info("Checking password");
        const isValid = await userRecord.comparePassword(password);
        if (!isValid) return HttpErrorException.unAuthorized("Invalid Password");

        const user = userRecord.toObject();
        // Remove password property from the user object
        Reflect.deleteProperty(user, "password");

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const issueBook = async (bookId: number, userId: string) => {
    const book = await BookModel.findOne({ bookId });

    if (!book) throw HttpErrorException.resourceNotFound("Book not found");
    const user = await UserModel.findById(userId);
    if (!user) throw HttpErrorException.resourceNotFound("User not found");

    // Chekc if book is already issued to the user
    const oldIssueRecord: IIssue[] = await Issue.find({ "userId.id": userId });

    const alreadyIssued = oldIssueRecord.filter(record => record.bookInfo.bookID === bookId).length > 0;
    if (alreadyIssued) throw HttpErrorException.alreadyExists("This issue already exists.")

    book.stock -= 1;
    const issue = new Issue({
        bookInfo: {
            ...book,
            stock: book.stock
        },
        userId: {
            id: user._id,
            username: user.username
        }
    })

    // Push issue record on individual user document
    user.booksIssued.push(book._id);

    await issue.save();
    await user.save();
    await book.save();

    return { success: true };
}

