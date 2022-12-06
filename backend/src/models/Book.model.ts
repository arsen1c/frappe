import mongoose from "mongoose";
import { IBook } from "interfaces/book.interface";

const BookSchema = new mongoose.Schema({
    bookID: Number,
    title: String,
    authors: String,
    average_rating: Number,
    isbn: String,
    isbn13: Number,
    language_code: String,
    num_pages: Number,
    ratings_count: Number,
    text_reviews_count: Number,
    publication_date: Date,
    publisher: String,
    stock: { type: Number, default: 5 },
});


export default mongoose.model<IBook>("Book", BookSchema);