import { Button, Center, Notification, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import useSWRMutation from "swr/mutation";
import { AxiosInstance } from '../../../utils/AxiosInstance';
import { successToast } from '../../../utils/ToastNotifications';

const sendRequest = async (endpoint: string, ...args: any) => {
    return AxiosInstance.post(endpoint, args[0].arg);
}

export function NewMemberModal() {
    const { trigger, isMutating, data, error } = useSWRMutation("/user/create", sendRequest);
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        }
    })

    if (!trigger && data) {
        successToast("User created");
    }

    return (
        <div>
            {error && <Center><Text color="red">{error.message}</Text></Center>}
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
            <TextInput mt="md" label="Username" placeholder="Username" {...form.getInputProps('username')} />
            <TextInput type={"password"} mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />
            <Button onClick={() => trigger(form.values)} loading={isMutating} my={20}>Create</Button>
        </div>
    )
}

export default NewMemberModal