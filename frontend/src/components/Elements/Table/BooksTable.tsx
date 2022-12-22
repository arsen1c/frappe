import {
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    ScrollArea,
    useMantineTheme,
    Title,
    Loader,
    Center,
    Modal,
    Menu,
    Tooltip,
    TextInput,
} from '@mantine/core';
import { IconArrowRight, IconBookDownload, IconDots, IconPencil, IconSearch, IconTrash, IconX } from '@tabler/icons';
import { useState } from 'react';
import { IBook } from '../../../interfaces/Book.interface';
import { getRequest } from '../../../utils/AxiosInstance';
import useSwr from "swr";
import useSWRMutation from "swr/mutation";
import { errorToast, successToast } from '../../../utils/ToastNotifications';
import { useDebouncedValue } from '@mantine/hooks';

const fetcher = (url: string) => getRequest<IBook[]>(url).then(res => res.data);
const importFetcher = (url: string) => getRequest<IBook[]>(url).then(res => res.data);
const booksFetcher = (title: string) => getRequest(`https://frappe.io/api/method/frappe-library?title=${title}`).then(res => res.data);

function IssueModalContent() {
    const [title, setTitle] = useState("");
    const [debounced] = useDebouncedValue(title, 200);

    const { data, error, trigger, isMutating } = useSWRMutation(title, booksFetcher);

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
                onChange={(e) => {
                    setTitle(e.currentTarget.value);
                    trigger(debounced);
                }}
            />
            <Center my={20}>
                {data ? <Table></Table> : <div>No Data</div>}
            </Center>
        </div>
    )
}

export default function BooksTable() {
    const theme = useMantineTheme();
    const { data, error, isLoading } = useSwr("/book/all", fetcher);
    const { trigger, error: importError, data: importBooksData, isMutating } = useSWRMutation("/book/import", importFetcher);

    const [searchModalOpen, setSearchModalOpen] = useState(false);

    if (importBooksData) {
        successToast("Books imported succesfully!");
    }


    const rows = data && data.map((item: IBook) => (
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
                <Text size="sm" weight={500}>
                    {item.authors}
                </Text>
            </td>
            <td>
                <Anchor<'a'> size="sm" weight={800}>
                    {item.average_rating}
                </Anchor>
            </td>
            <td>
                <Text size="sm">{item.stock}</Text>
            </td>
            <td>
                <Menu transition="pop" withArrow position="bottom">
                    <Menu.Target>
                        <ActionIcon>
                            <IconDots size={16} stroke={1.5} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item icon={<IconPencil size={16} stroke={1.5} />}>Edit</Menu.Item>
                        <Menu.Item icon={<IconTrash size={16} stroke={1.5} />} color="red">
                            Delete
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </td>
        </tr>
    ));

    return (
        <div>
            <Group
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 20
                }}
            >
                <Title>Books List</Title>
                <Group sx={{ alignSelf: "end" }}>
                    <Tooltip label="Search" withArrow color={theme.colors.blue[4]}>
                        <ActionIcon component='button' onClick={() => setSearchModalOpen(true)} color="blue">
                            <IconSearch />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Import Books" withArrow color={theme.colors.blue[4]}>
                        <ActionIcon color="blue" loading={isMutating} onClick={trigger}>
                            <IconBookDownload />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
            <Modal opened={searchModalOpen} onClose={() => setSearchModalOpen(false)} size={"lg"}><IssueModalContent /></Modal>
            <ScrollArea>
                {isLoading && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>}
                {error && <Text color={"red"}>Couldn't fetch books: {error}</Text>}
                {importError && errorToast(importError.response.data.message)}

                {(data && !isLoading) &&
                    <Center style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Table highlightOnHover sx={{ minWidth: 800, maxHeight: "1px" }} verticalSpacing="xs">
                            <thead>
                                <tr>
                                    <th>BookID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Average Rating</th>
                                    <th>Stock</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </Center>
                }
            </ScrollArea>
        </div >
    );
}