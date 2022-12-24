import { Button, Center, Text } from '@mantine/core'
import useSWRMutation from "swr/mutation";
import { deleteRequest } from "../../../utils/AxiosInstance";

const sendDeleteRequest = async (endpoint: string, ...args: any) => {
    return deleteRequest(endpoint, args[0].arg);
}

function DeleteUserModal({ userId }: { userId: string }) {
    const { trigger, data, error, isMutating } = useSWRMutation(`/user/delete/${userId}`, sendDeleteRequest);

    return (
        <div>
            {error && <Center><Text color={"red"}>{error.message}</Text></Center>}
            {(data && !error) && <Center><Text color={"green"}>{"User Deleted!"}</Text></Center>}
            <Button loading={isMutating} onClick={() => trigger({ userId })} color="red">Delete</Button>
        </div>
    )
}

export default DeleteUserModal