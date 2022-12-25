import { Button, Center, Text } from '@mantine/core'
import { useState } from 'react';
import useSWRMutation from "swr/mutation";
import { IMember } from '../../../interfaces/Member.interface';
import { deleteRequest } from "../../../utils/AxiosInstance";
import { errorToast, successToast } from '../../../utils/ToastNotifications';

const sendDeleteRequest = async (endpoint: string, ...args: any) => {
    return deleteRequest(endpoint, args[0].arg);
}

interface PropType {
    userId: string;
    removeMember: (userId: string) => void;
    setDeleteModalOpen: ({ open, userId }: { open: boolean, userId: string }) => void;
}

function DeleteUserModal({ userId, removeMember, setDeleteModalOpen }: PropType) {
    const [loading, setLoading] = useState(false);

    const deleteUserRequest = async () => {
        setLoading(true);
        deleteRequest(`/user/delete/${userId}`)
            .then(res => {
                setLoading(false);
                removeMember(userId);
                successToast("User Deleted!");
                setDeleteModalOpen({ open: false, userId: "" })
            }).catch(error => {
                const errorMsg = error.response.data.message ? error.response.data.message : error.message;
                errorToast(errorMsg);
                setLoading(false);
            })
    }

    return (
        <div>
            <Button loading={loading} onClick={deleteUserRequest} color="red">Delete</Button>
        </div>
    )
}

export default DeleteUserModal