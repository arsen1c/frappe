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

/* Fetch all books */
export const fetchAllBooks = async (): Promise<Array<IBook>> => {
    return await BookModel.find({});
}

export const findBook = async (bookName: string): Promise<Array<IBook>> => {
    logger.info("Looking for book")
    // Find books from their title. Partial search enabled.
    const bookRecord = await BookModel.find({ title: { $regex: bookName, $options: "i" } });

    if (!bookRecord) throw HttpErrorException.resourceNotFound();
    return bookRecord;
}

export const importOneBook = async (book: IBook): Promise<IBook> => {
    const alreadyExists = await BookModel.exists({ bookID: book.bookID });

    if (alreadyExists) throw HttpErrorException.alreadyExists("Book already exists!")

    const bookRecord: IBook = await BookModel.create(book);

    return bookRecord;
}

export const deleteSingleBook = async (bookID: string): Promise<boolean> => {
    const bookDoc = await BookModel.findOneAndDelete({ bookID });

    if (!bookDoc) throw HttpErrorException.resourceNotFound("Invalid book id");

    return true;
}