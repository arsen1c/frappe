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
    Button,
    Notification,
    useMantineColorScheme,
    Menu,
} from '@mantine/core';
import { IconCheck, IconDots, IconPencil, IconSearch, IconTrash, IconX } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { IBook } from '../../../interfaces/Book.interface';
import { AxiosInstance, getRequest } from '../../../utils/AxiosInstance';
import useSwr from "swr";
import useSWRMutation from "swr/mutation";
import { showNotification } from '@mantine/notifications';
import { errorToast, successToast } from '../../../utils/ToastNotifications';

function ModalContent({ issueId }: { issueId: string }) {
    return (
        <Button color={"red"}>Delete</Button>
    )
}

const fetcher = (url: string) => getRequest<IBook[]>(url).then(res => res.data);
const importFetcher = (url: string) => getRequest<IBook[]>(url).then(res => res.data);

export default function BooksTable() {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    // const {importError, setImportError} = useState("");

    const { data, error, isLoading } = useSwr("/book/all", fetcher);
    const { trigger, error: importError, data: importBooksData } = useSWRMutation("/book/import", importFetcher);

    // const [books, setBooks] = useState<IBook[]>([]);
    // const [error, setError] = useState<string>("");
    // const [isPending, setIsPending] = useState<boolean>(true);

    if (importBooksData) {
        successToast("Books imported succesfully!");
    }

    const [deleteModal, setDeleteModal] = useState({ opened: false, issueId: "" });
    const [editModalOpened, setEditModalOpened] = useState(false);
    // useEffect(() => {
    //     const fetchBooks = async () => {
    //         setIsPending(true)
    //         getRequest("/book/all")
    //             .then((res) =1
    //                 setBooks(res.data);
    //                 setError("");
    //                 setIsPending(false);
    //             }).catch(error => {
    //                 setIsPending(false);
    //                 setError(error.message)
    //             })
    //     }

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
                    <ActionIcon sx={{ padding: "10" }} variant='filled' color={"blue"} component='button'>
                        <IconSearch size={30} stroke={1.5} />
                    </ActionIcon>
                    <Button onClick={trigger}>Import books</Button>
                </Group>
            </Group>
            <Modal centered opened={deleteModal.opened} withCloseButton={true} title={`Delete issue ${deleteModal.issueId}`} size="auto" onClose={() => setDeleteModal({ opened: false, issueId: "" })}>{<ModalContent issueId={"LMA"} />}</Modal>
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