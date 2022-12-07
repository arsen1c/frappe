import mongoose from "mongoose";
import { IIssue } from "../interfaces/issue.interface";

export interface IssueSchema extends IIssue, mongoose.Document { };

const IssueSchema = new mongoose.Schema<IssueSchema>({
    bookInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        bookID: String,
        title: String,
        authors: String,
        average_rating: String,
        isbn: String,
        isbn13: String,
        language_code: String,
        num_pages: String,
        ratings_count: String,
        text_reviews_count: String,
        publication_date: String,
        publisher: String,
        stock: Number,
        issueDate: { type: Date, default: Date.now() },
        returnDate: { type: Date, default: Date.now() + 7 * 24 * 60 * 60 * 1000 },
    },

    userId: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },

        username: String,
    },
});

export default mongoose.model<IssueSchema>("Issue", IssueSchema);