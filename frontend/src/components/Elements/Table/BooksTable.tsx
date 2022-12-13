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
import { IconCheck, IconDots, IconPencil, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { IIssue, useFetch } from '../../../hooks/useFetch';
import { IBook } from '../../../interfaces/Book.interface';


const NotificationComponent = () => {
    return (
        <Notification icon={<IconCheck size={20} />} title="We notify you that">
            You are now obligated to give a star to Mantine project on GitHub
        </Notification>
    )
}

function ModalContent({ issueId }: { issueId: string }) {
    return (
        <Button color={"red"} onClick={NotificationComponent}>Delete</Button>
    )
}

export default function BooksTable() {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const { data, error, isPending } = useFetch("/book/all");
    const [deleteModal, setDeleteModal] = useState({ opened: false, issueId: "" });
    const [editModalOpened, setEditModalOpened] = useState(false);

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
                {isPending && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>}
                {error && <Text color={"red"}>Couldn't fetch books: {error}</Text>}
                {(data && !isPending) &&
                    <Center style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Modal centered opened={deleteModal.opened} withCloseButton={true} title={`Delete issue ${deleteModal.issueId}`} size="auto" onClose={() => setDeleteModal({ opened: false, issueId: "" })}>{<ModalContent issueId={"LMA"} />}</Modal>
                        <Button onClick={() => toggleColorScheme()}>Import books</Button>
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
        </div>
    );
}