import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { IBook } from "interfaces/book.interface";
import { importBooks } from "service/books.service";

export const bookController = {
    /* Fetch and add books from frappe api to the database */
    async getBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const { data: { message } }: { data: { message: Array<IBook> } } = await axios.get("https://frappe.io/api/method/frappe-library", {
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            });

            const response = await importBooks(message);
            res.status(201).json(response);
        } catch (error: any) {
            next(error);
        }
    }
}