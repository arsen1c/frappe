import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { AxiosInstance, getRequest } from "../../../utils/AxiosInstance";
import useSWRMutation from "swr/mutation";
import { ActionIcon, Center, Loader, Table, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { IconArrowRight, IconBookDownload, IconSearch } from "@tabler/icons";
import { IBook } from "../../../interfaces/Book.interface";
import { errorToast, successToast } from "../../../utils/ToastNotifications";

const booksFetcher = (title: string) => getRequest<IBook[]>(`/book/query?title=${title}`).then(res => res.data);
const bookImportRequest = (url: string, ...args: any) => {
    return AxiosInstance.post(url, args[0].arg);
}

const SearchResultTable = ({ books }: { books: IBook[] }) => {

    const { trigger, data, isMutating, error } = useSWRMutation("/book/import/single", bookImportRequest)

    if (data) {
        successToast("Book imported!");
    }

    if (error) {
        const errorMsg: string = error.response.data.message ? error.response.data.message : error.message
        errorToast(errorMsg)
    }

    const rows = books && books.map((item: IBook) => (
        <tr key={item._id}>
            <td>
                <Text size="sm" weight={500}>
                    {item.bookID}
                </Text>
            </td>
            <td>
                <Text size="sm" weight={500}>
                    {item.title}
                </Text>
            </td>
            <td>
                <Tooltip label={'Import'}>
                    <ActionIcon component="button" onClick={() => trigger({ book: item })} variant="subtle" color="blue">
                        <IconBookDownload size={16} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </td>
        </tr >
    ));

    return (
        <Table width={"auto"} highlightOnHover verticalSpacing="xs">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th />
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}

export function BookSearchModal() {
    const [title, setTitle] = useState("");
    const [debounced] = useDebouncedValue(title, 500);

    const { data, error, trigger, isMutating } = useSWRMutation<IBook[]>(title, booksFetcher);

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
            {isMutating && <Center my={20}><Loader /></Center>}
            <Center my={20}>
                {error && <Text color="red">{error}</Text>}
                {data && <SearchResultTable books={isMutating ? [] : data} />}
            </Center>
        </div>
    )
}