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
import { IconCheck, IconDots, IconPencil, IconTrash, IconX } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { IBook } from '../../../interfaces/Book.interface';
import { AxiosInstance, getRequest } from '../../../utils/AxiosInstance';
import useSwr from "swr";
import useSWRMutation from "swr/mutation";
import { toast, ToastContainer } from 'react-toastify';
import { showNotification } from '@mantine/notifications';
import { errorToast } from '../../../utils/ToastNotifications';

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
    const { trigger, error: importError } = useSWRMutation("/book/import", importFetcher);

    // const [books, setBooks] = useState<IBook[]>([]);
    // const [error, setError] = useState<string>("");
    // const [isPending, setIsPending] = useState<boolean>(true);

    const [deleteModal, setDeleteModal] = useState({ opened: false, issueId: "" });
    const [editModalOpened, setEditModalOpened] = useState(false);
    const notify = (message: string) => toast(message)
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
            <Center><Title>Books List</Title></Center>
            <ScrollArea>
                {isLoading && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>}
                {error && <Text color={"red"}>Couldn't fetch books: {error}</Text>}
                {/* {importError && <Text color={"red"}>Couldn't fetch books: {importError.response.data.message}</Text>} */}
                {/* {importError && showNotification({
                    // title: 'Default notification',
                    message: importError.response.data.message,
                    icon: <IconX />,
                    color: "red",
                })} */}
                {importError && errorToast(importError.response.data.message)}

                {(data && !isLoading) &&
                    <Center style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Modal centered opened={deleteModal.opened} withCloseButton={true} title={`Delete issue ${deleteModal.issueId}`} size="auto" onClose={() => setDeleteModal({ opened: false, issueId: "" })}>{<ModalContent issueId={"LMA"} />}</Modal>
                        <Button onClick={trigger}>Import books</Button>
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