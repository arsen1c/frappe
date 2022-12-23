import { Button, Input, Modal, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { getRequest, postRequest } from '../../../utils/AxiosInstance';
import { IBook } from "../../../interfaces/Book.interface";
import { IIssue } from "../../../interfaces/Issue.interface"
import { IMember } from "../../../interfaces/Member.interface";
import { successToast } from '../../../utils/ToastNotifications';
interface PorpTypes {
    isOpened: boolean;
    setIsOpened(value: boolean): void;
}

interface ISubmit { userId: string, bookId: string }

/* Helper function */
const handleSubmit = ({ userId, bookId }: ISubmit) => {
    console.log("User id:", userId);
    console.log("Book id:", bookId);

}



function IssueModal({ isOpened, setIsOpened }: PorpTypes) {
    const [userValue, setUserValue] = useState<string>("");
    const [bookValue, setBookValue] = useState<string>("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [users, setUsers] = useState<Array<IMember> | []>([]);
    const [books, setBooks] = useState<Array<IBook> | []>([]);

    const postIssueData = async (): Promise<void> => {
        return postRequest("/user/issue", {
            "bookid": bookValue,
            "userid": userValue
        }).then(({ data }: { data: IIssue }) => {
            setIsPending(false);
            setError("");
            setIsOpened(false);
            successToast("New book issued!")
        }).catch(error => {
            setIsPending(false);
            setError(error.response.data.message);
        })
    }

    useEffect(() => {
        const fetchBooks = async (): Promise<void> => {
            // Fetch book
            return getRequest<IBook[]>("/book/all")
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
            return getRequest<IMember[]>("/user/all")
                .then(({ data }: { data: IMember[] }) => {
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
            {error && <Text color="red">{error}</Text>}
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