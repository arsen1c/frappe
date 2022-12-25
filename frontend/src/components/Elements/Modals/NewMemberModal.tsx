import { Button, Center, Notification, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { IMember } from '../../../interfaces/Member.interface';
import { postRequest } from '../../../utils/AxiosInstance';
import { errorToast, successToast } from '../../../utils/ToastNotifications';
interface PropType {
    newMember: (member: IMember) => void;
    setNewMemberModal: (value: boolean) => void;
}

export function NewMemberModal({ newMember, setNewMemberModal }: PropType) {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        }
    })

    const postNewMember = async () => {
        setLoading(true)
        return postRequest("/user/create", {
            ...form.values
        }).then(res => {
            setLoading(false);
            newMember(res.data.data);
            successToast("Member created");
            setNewMemberModal(false);
        }).catch(error => {
            const errorMsg: string = error.response.data.message ? error.response.data.message : error.message
            errorToast(errorMsg);
            setLoading(false);
        })
    }

    return (
        <div>
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
            <TextInput mt="md" label="Username" placeholder="Username" {...form.getInputProps('username')} />
            <TextInput type={"password"} mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />
            <Button onClick={postNewMember} loading={loading} my={20}>Create</Button>
        </div>
    )
}

export default NewMemberModal