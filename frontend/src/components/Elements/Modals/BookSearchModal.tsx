import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { getRequest } from "../../../utils/AxiosInstance";
import useSWRMutation from "swr/mutation";
import { ActionIcon, Center, Table, Text, TextInput, Title } from "@mantine/core";
import { IconArrowRight, IconBookDownload, IconSearch } from "@tabler/icons";
import { IBook } from "../../../interfaces/Book.interface";

const booksFetcher = (title: string) => getRequest<IBook[]>(`/book/query?title=${title}`).then(res => res.data);

const SearchResultTable = ({ books }: { books: IBook[] }) => {
    console.log("Books:", books);

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
            {/* <td>
                <Text size="sm" weight={500}>
                    {item.authors}
                </Text>
            </td> */}
            <td>
                <Text size="sm">{item.stock}</Text>
            </td>
            {/* <td>
                <ActionIcon>
                    <IconBookDownload size={16} stroke={1.5} />
                </ActionIcon>
            </td> */}
        </tr>
    ));

    return (
        <Table highlightOnHover sx={{ minWidth: 800, maxHeight: "1px" }} verticalSpacing="xs">
            <thead>
                <tr>
                    <th>BookID</th>
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
            <Center my={20}>
                {data ? <SearchResultTable books={data} /> : <div>No Data</div>}
            </Center>
        </div>
    )
}