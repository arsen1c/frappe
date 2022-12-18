
export interface BookInfo {
    bookID: string;
    title: string;
    authors: string;
    average_rating: string;
    isbn: string;
    isbn13: string;
    language_code: string;
    ratings_count: string;
    text_reviews_count: string;
    publication_date: string;
    publisher: string;
    stock: number;
    issueDate: Date;
    returnDate: Date;
}

export interface UserId {
    id: string;
    username: string;
}

export interface IIssue {
    bookInfo: BookInfo;
    userId: UserId;
    _id: string;
}


