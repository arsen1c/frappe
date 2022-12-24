import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { IBook } from "interfaces/book.interface";
import { deleteSingleBook, fetchAllBooks, findBook, importBooks, importOneBook } from "service/books.service";
import { HttpErrorException } from "exceptions/HttpErrorException";

export const bookController = {
    /* Fetch and add books from frappe api to the database */
    async getBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const { data: { message } }: { data: { message: Array<IBook> } } = await axios.get("https://frappe.io/api/method/frappe-library", {
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            });

            const response: IBook[] = await importBooks(message);
            res.status(201).json(response);
        } catch (error: any) {
            next(error);
        }
    },

    async getAllBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const books: IBook[] = await fetchAllBooks();
            res.status(200).json(books);
        } catch (error: any) {
            next(error);
        }
    },

    /* Search for a book using it's title (Partial search enabled) */
    async getBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { bookname } = req.params;
            const bookRecord: IBook[] = await findBook(bookname);

            res.status(200).json(bookRecord);
        } catch (error: any) {
            next(error);
        }
    },

    // Search book from frappe api
    async searchBooks(req: Request, res: Response, next: NextFunction) {
        const { title, authors } = req.query;
        const query = `${title && `title=${title}&`}${authors && `&authors=${authors}`}`;

        return axios.get(`https://frappe.io/api/method/frappe-library?${query}`, {
            headers: {
                'Accept-Encoding': 'application/json',
            }
        })
            .then(({ data: { message } }: { data: { message: IBook[] } }) => res.status(200).json(message))
            .catch(error => {
                next(error);
            })
    },

    // Import specific book from frappe api
    async importSingleBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { book }: { book: IBook } = req.body;
            if (!book) throw HttpErrorException.resourceNotFound("Book not found");

            const response: IBook = await importOneBook(book);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    },

    // Delete a book from the database
    async deleteBook(req: Request, res: Response, next: NextFunction) {
        try {

            const { bookId } = req.body;
            const response = deleteSingleBook(bookId);

            res.status(202).send("Ok");
        } catch (error) {
            next(error);
        }
    }
}