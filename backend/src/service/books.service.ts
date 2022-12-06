import { IBook } from "interfaces/book.interface";
import BookModel from "models/Book.model";
import { HttpErrorException } from "exceptions/HttpErrorException";
import { logger } from "utils/logger";

/* Add the books in the database */
export const importBooks = async (books: Array<IBook>): Promise<Array<IBook>> => {
    const booksRecord = await BookModel.find({});
    if (booksRecord.length > 0) throw HttpErrorException.booksAlreaydImported();
    return await BookModel.insertMany(books);
}

export const findBook = async (bookName: string): Promise<Array<IBook>> => {
    logger.info("Looking for book")
    // Find books from their title. Partial search enabled.
    const bookRecord = await BookModel.find({ title: { $regex: bookName, $options: "i" } });

    if (!bookRecord) throw HttpErrorException.resourceNotFound();
    return bookRecord;
}