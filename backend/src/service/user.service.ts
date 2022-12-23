import { HttpErrorException } from "exceptions/HttpErrorException";
import { IBook } from "interfaces/book.interface";
import { IIssue } from "interfaces/issue.interface";
import { IUserInput, IUserUpdate } from "interfaces/user.interface";
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

export async function findAllUsers(): Promise<Array<UserDocument>> {
    return await UserModel.find();

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

/* User login */
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

/* Issue new book to the user */
export const issueBook = async (bookID: number, userId: mongoose.Types.ObjectId): Promise<IBook> => {
    const book = await BookModel.findOne({ bookID });
    if (!book) throw HttpErrorException.resourceNotFound("Book not found");
    const user = await UserModel.findById(userId);
    if (!user) throw HttpErrorException.resourceNotFound("User not found");

    logger.info("Checking if book is already assigned to the user.")
    const oldIssueRecord: IIssue[] = await Issue.find({ "userId.id": userId });
    // Check if book is already issued to the user
    const alreadyIssued = oldIssueRecord.filter(record => record.bookInfo.bookID === bookID).length > 0;
    if (alreadyIssued) throw HttpErrorException.alreadyExists("This issue already exists.");

    logger.info("Issuing new book.");

    // Decrement stock
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
    user.booksIssued.push(issue._id);

    logger.info("Saving data");
    await book.save();
    await issue.save();
    await user.save();
    logger.info("Book issued succesfully");

    return book;
}

/* Update user details */
export const updateUser = async (userData: IUserUpdate): Promise<UserDocument> => {
    const userRecord = await UserModel.findOneAndUpdate({ _id: userData._id }, userData, { new: true }).select("-password");
    userRecord.save();

    return userRecord;
}

/* Delete issue */
export const removeIssueBook = async (issueId: string, userId: string) => {
    const issue = await Issue.findOne({ _id: issueId });
    if (!issue) throw HttpErrorException.resourceNotFound("Invalid issue ID");
    if (!(issue.userId.id == userId)) throw HttpErrorException.resourceNotFound("Mismatching of IssueId and UserId");

    const user = await UserModel.findById(userId);
    if (!user) throw HttpErrorException.resourceNotFound("User not found");
    logger.info("IssueId and UserId matched.");

    const book = await BookModel.findOne({ "bookID": issue.bookInfo.bookID });
    // increase book stock by 1
    book.stock += 1;
    // Delete issue
    await Issue.deleteOne({ _id: issueId });

    // Remove issue from user document's issuedBooks array
    await UserModel.updateOne(
        { _id: userId },
        {
            "$pull": { "booksIssued": { "$in": [issueId] } }
        },
    )

    await book.save();

    logger.info("Issue removed succesfully");
    return { success: true };
}

