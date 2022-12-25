import { Button, Center, Text } from "@mantine/core";
import { AxiosInstance } from "../../../utils/AxiosInstance";
import useSWRMutation from "swr/mutation";
import { errorToast, successToast } from "../../../utils/ToastNotifications";
import { deleteRequest } from "../../../utils/AxiosInstance";
import { useState } from "react";

interface PropType {
    bookId: number;
    removeBook: (bookId: number) => void;
    setDeleteModalOpen: (value: boolean) => void;
}

function DeleteBookModal({ bookId, removeBook, setDeleteModalOpen }: PropType) {
    const [loading, setLoading] = useState(false);

    const deleteBookRequest = async () => {
        setLoading(true);
        deleteRequest(`/book/delete/${bookId}`, {
            bookId
        }).then(res => {
            removeBook(bookId);
            setLoading(false);
            successToast("Book removed!");
            setDeleteModalOpen(false);
        }).catch(error => {
            errorToast(error.message);
            setLoading(false);
        })
    }

    return (
        <div>
            <Button loading={loading} onClick={deleteBookRequest} color="red">Delete</Button>
        </div>
    )
}

export default DeleteBookModal;