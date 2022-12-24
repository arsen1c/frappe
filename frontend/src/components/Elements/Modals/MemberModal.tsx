import { Button, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCurrencyRupee } from '@tabler/icons';
import { IMember } from '../../../interfaces/Member.interface';
import useSWRMutation from "swr/mutation";
import { AxiosInstance } from '../../../utils/AxiosInstance';
import { successToast } from '../../../utils/ToastNotifications';

const sendRequest = async (url: string, ...args: any) => {
    return AxiosInstance.put(url, args[0].arg);
}

function MemberModal({ member }: { member: IMember }) {
    const form = useForm<IMember>({ initialValues: { ...member } })
    const totalIssues = form.getInputProps("booksIssued");
    const { trigger, isMutating, data, error } = useSWRMutation("/user/update", sendRequest);

    if (data) {
        successToast("Details Updated!")
    }

    return (
        <div>
            {error && <Text color={"red"}>{error.message}</Text>}
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
            <TextInput mt="md" label="Username" placeholder="Username" {...form.getInputProps('username')} />
            <TextInput mt="md" label="Issues" placeholder="Issues" value={totalIssues.value.length} disabled={true} />
            <TextInput icon={<IconCurrencyRupee />} mt="md" label="Debt" placeholder="Debt" {...form.getInputProps('debt')} />
            <Button onClick={() => trigger(form.values)} my={20} loading={isMutating}>Save</Button>
        </div>
    )
}

export default MemberModal