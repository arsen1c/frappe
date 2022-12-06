import { IBook } from "interfaces/book.interface";
import BookModel from "models/Book.model";
import { HttpErrorException } from "exceptions/HttpErrorException";

/* Add the books in the database */
export const importBooks = async (books: Array<IBook>) => {
    try {
        const booksRecord = await BookModel.find({});

        if (booksRecord.length > 0) return HttpErrorException.booksAlreaydImported();

        return await BookModel.insertMany(books);
    } catch (error: any) {
        throw new Error(error);
    }
}