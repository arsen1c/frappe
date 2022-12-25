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
} from '@mantine/core';
import { IconBookDownload, IconDots, IconPencil, IconSearch, IconTrash } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { IBook } from '../../../interfaces/Book.interface';
import { errorToast } from '../../../utils/ToastNotifications';
import { BookSearchModal } from '../Modals/BookSearchModal';
import DeleteBookModal from '../Modals/DeleteBookModal';
import { useBooksStore } from '../../../context/BooksContex';

export default function BooksTable() {
    const theme = useMantineTheme();
    const { books, newBook, removeBook, fetchBooks, error, loading } = useBooksStore();
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookSelected, setBookSelected] = useState(0);

    useEffect(() => {
        fetchBooks();
    }, [])

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
                        <Menu.Item icon={<IconTrash size={16} stroke={1.5} />} color="red" onClick={() => {
                            setDeleteModalOpen(true);
                            setBookSelected(item.bookID)
                        }}>
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
                        <ActionIcon color="blue" loading={loading}>
                            <IconBookDownload />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
            <Modal fullScreen opened={searchModalOpen} onClose={() => setSearchModalOpen(false)} size={"xl"}><BookSearchModal newBook={newBook} /></Modal>
            <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} size={"lg"} title={`Delete book ${bookSelected}`}><DeleteBookModal removeBook={removeBook} bookId={bookSelected} setDeleteModalOpen={setDeleteModalOpen} /></Modal>
            <ScrollArea>
                {loading && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>}
                {error && <Text color={"red"}>Couldn't fetch books: {error.message}</Text>}
                {error && errorToast(error.response.data.message)}

                {(books && !loading) &&
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