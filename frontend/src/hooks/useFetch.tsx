import axios from "axios";
import { useState, useEffect } from "react";
import { getRequest } from "../utils/AxiosInstance";

export interface IIssue {
    bookInfo: {
        id: string;
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
        issueDate: string;
        returnDate: string;
    }

    userId: {
        id: string;
        username: string;
    },
    _id: string;
}

export const useFetch = (endpoint: string) => {
    const [data, setData] = useState<Array<IIssue>>([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const abortControl = new AbortController();

        getRequest(endpoint)
            .then(res => {
                console.log(res.data);

                setData(res.data);
                setIsPending(false);
                setError("");
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    setError("Fetch aborted");
                    setIsPending(false);
                } else {
                    setError(error.message);
                    setIsPending(false);
                }
            })
        return () => abortControl.abort();
    }, [endpoint]);

    return { data, isPending, error };
}