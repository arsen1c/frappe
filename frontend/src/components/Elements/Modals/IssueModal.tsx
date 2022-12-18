import { Button, Input, Modal, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { getRequest, postRequest } from '../../../utils/AxiosInstance';
import { IBook } from "../../../interfaces/Book.interface";
import { IIssue } from '../../../hooks/useFetch';
import { IUser } from "../../../interfaces/User.interface";
interface PorpTypes {
    isOpened: boolean;
    setIsOpened(value: boolean): void;
    setData(value: IIssue[]): void;
}

interface ISubmit { userId: string, bookId: string }

/* Helper function */
const handleSubmit = ({ userId, bookId }: ISubmit) => {
    console.log("User id:", userId);
    console.log("Book id:", bookId);

}



function IssueModal({ isOpened, setIsOpened, setData }: PorpTypes) {
    const [issues, setIssues] = useState([]);
    const [userValue, setUserValue] = useState<string>("");
    const [bookValue, setBookValue] = useState<string>("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [users, setUsers] = useState<Array<IUser> | []>([]);
    const [books, setBooks] = useState<Array<IBook> | []>([]);

    const postIssueData = async (): Promise<void> => {
        return postRequest("/user/issue", {
            "bookid": bookValue,
            "userid": userValue
        }).then(({ data }: { data: IIssue[] }) => {
            setIsPending(false);
            setError("");
            setData([...data]);
            setIsOpened(false);
        }).catch(error => {
            setIsPending(false);
            setError(error.message);
        })
    }

    useEffect(() => {
        const fetchBooks = async (): Promise<void> => {
            // Fetch book
            return getRequest("/book/all")
                .then(({ data }: { data: IBook[] }) => {
                    setIsPending(false);
                    setError("");
                    setBooks(data);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                });
        }
        fetchBooks()

        const fetchUsers = async (): Promise<void> => {
            // Fetch book
            return getRequest("/user/all")
                .then(({ data }: { data: IUser[] }) => {
                    setIsPending(false);
                    setError("");
                    setUsers(data);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                });
        }
        fetchUsers();
    }, [])

    return (
        <Modal
            opened={isOpened}
            onClose={() => setIsOpened(false)}
            title="Issue a new book to user"
        >
            <Text>Select a user</Text>
            <Input defaultValue={""} onChange={(e) => setUserValue(e.target.value)} component='select'>
                <option key={""} value={""} defaultValue={""} disabled>{"User"}</option>
                {users && users.map(user =>
                    <option key={user._id} value={user._id}>{user.username}</option>
                )}
            </Input>
            <Text>Select a book</Text>
            <Input defaultValue={""} onChange={(e) => setBookValue(e.target.value)} component='select'>
                <option key={""} value={""} defaultValue={""} disabled>{"Book"}</option>
                {books && books.map(book =>
                    <option key={book._id} value={book.bookID}>{book.title}</option>
                )}
            </Input>
            <Button my={10} value={""} onClick={postIssueData}>Submit</Button>
        </Modal >
    )
}

export default IssueModal