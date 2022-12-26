import create from "zustand";
import { IBook } from "../interfaces/Book.interface";
import { getRequest } from "../utils/AxiosInstance";

export interface BooksState {
    books: IBook[] | [],
    newBook: (book: IBook) => void;
    importBooks: (newBooks: IBook[]) => void;
    removeBook: (bookId: number) => void;
    fetchBooks: () => void;
    loading: boolean;
    error: any;
}

export const useBooksStore = create<BooksState>((set) => ({
    books: [],
    loading: false,
    error: null,
    newBook: (newBookData: IBook) => set((state) => ({ books: [...state.books, newBookData] })),
    importBooks: (newBooks: IBook[]) => set((state) => ({ books: [...state.books, ...newBooks] })),
    removeBook: (bookId: number) => set((state) => ({ books: [...state.books.filter(book => book.bookID != bookId)] })),
    fetchBooks: async () => {
        set({ loading: true })
        getRequest<IBook[]>("/book/all")
            .then(({ data }: { data: IBook[] }) => {
                set({ loading: false, books: data });
            }).catch(error => {
                set({ loading: false, error })
            })
    },
}))