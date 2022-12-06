export interface IBook {
    bookID: number;
    title: string;
    authors: string;
    average_rating: number;
    isbn: number;
    isbn13: number;
    language_code: string;
    num_pages: number;
    ratings_count: number;
    text_reviews_count: number;
    publication_date: Date;
    publisher: string;
    stock: number;
}