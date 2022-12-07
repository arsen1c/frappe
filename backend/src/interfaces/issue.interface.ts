import mongoose from "mongoose";

export interface IIssue {
    bookInfo: {
        id: mongoose.Types.ObjectId;
        bookID: number;
        title: string;
        authors: string;
        average_rating: string;
        isbn: string;
        isbn13: string;
        language_code: string;
        num_pages: string,
        ratings_count: string;
        text_reviews_count: string;
        publication_date: string;
        publisher: string;
        stock: number,
        issueDate: Date;
        returnDate: Date;
    }

    userId: {
        id: string;
        username: string;
    }
}