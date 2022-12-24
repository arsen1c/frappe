import { Button, Center, Text } from "@mantine/core";
import { AxiosInstance } from "../../../utils/AxiosInstance";
import useSWRMutation from "swr/mutation";
import { successToast } from "../../../utils/ToastNotifications";
import { deleteRequest } from "../../../utils/AxiosInstance";

interface PropType {
    bookId: number;
}

const sendDeleteRequest = async (endpoint: string, ...args: any) => {
    return deleteRequest(endpoint, args[0].arg);
}

function DeleteBookModal({ bookId }: PropType) {
    const { trigger, data, error, isMutating } = useSWRMutation(`/book/delete/${bookId}`, sendDeleteRequest);

    return (
        <div>
            {error && <Center><Text color={"red"}>{error.message}</Text></Center>}
            {(data && !error) && <Center><Text color={"green"}>{"Book removed!"}</Text></Center>}
            <Button loading={isMutating} onClick={() => trigger({ bookId })} color="red">Delete</Button>
        </div>
    )
}

export default DeleteBookModal;