import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { getRequest } from "../../../utils/AxiosInstance";
import useSWRMutation from "swr/mutation";
import { ActionIcon, Center, Table, TextInput, Title } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons";

const booksFetcher = (title: string) => getRequest(`https://frappe.io/api/method/frappe-library?title=${title}`).then(res => res.data);

export function BookSearchModal() {
    const [title, setTitle] = useState("");
    const [debounced] = useDebouncedValue(title, 500);

    const { data, error, trigger, isMutating } = useSWRMutation(title, booksFetcher);

    useEffect(() => {
        // trigger search request after 500
        trigger(debounced);
    }, [debounced])

    return (
        <div>
            <Title>Search</Title>
            <TextInput
                icon={<IconSearch size={18} stroke={1.5} />}
                radius="xl"
                size="md"
                rightSection={
                    <ActionIcon color={"blue"} size={32} radius="xl" variant="filled">
                        <IconArrowRight size={18} stroke={1.5} />
                    </ActionIcon>
                }
                placeholder="Search for books"
                rightSectionWidth={42}
                value={title}
                onChange={(e) => { setTitle(e.currentTarget.value); }}
            />
            <Center my={20}>
                {data ? <Table></Table> : <div>No Data</div>}
            </Center>
        </div>
    )
}