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
import { IconCheck, IconCurrencyRupee, IconDots, IconPencil, IconTrash, IconUser } from '@tabler/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { IBook } from '../../../interfaces/Book.interface';
import { IMember } from '../../../interfaces/Member.interface';
import { infoData } from '../Member/MemberInfoCard';
import { MemberInfoICard } from '../Member/MemberInfoCard';


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

export default function MembersTable() {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const { data, error, isPending } = useFetch("/user/all");
    const [deleteModal, setDeleteModal] = useState({ opened: false, issueId: "" });
    const [editModalOpened, setEditModalOpened] = useState(false);

    const rows = data && data.map((member: IMember) => (
        <tr key={member._id}>
            <td>
                <Link style={{ textDecoration: "none" }} to={`/member/${member.username}`}>
                    <Text color={theme.black} size="sm" tt="capitalize" weight={500}>
                        <MemberInfoICard {...infoData({ title: member.isAdmin ? "Admin" : "Member", name: member.name })} />
                    </Text></Link>
            </td>
            <td>
                <Text size="sm" weight={500}>
                    {member.booksIssued?.length || 0}
                </Text>
            </td>
            <td>
                <Text sx={{ display: "flex", alignItems: "center" }} size="sm" weight={500}>
                    <IconCurrencyRupee size={15} /> {member.debt}
                </Text>
            </td>
            <td>
                <Anchor<'a'> size="sm" weight={800}>
                    {String(new Date(member.createdAt).toDateString())}
                </Anchor>
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
            <Center><Title>Members</Title></Center>
            <ScrollArea>
                {isPending && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>}
                {error && <Text color={"red"}>Couldn't fetch members: {error}</Text>}
                {(data && !isPending) &&
                    <Center style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Modal centered opened={deleteModal.opened} withCloseButton={true} title={`Delete issue ${deleteModal.issueId}`} size="auto" onClose={() => setDeleteModal({ opened: false, issueId: "" })}>{<ModalContent issueId={"LMA"} />}</Modal>
                        <Button onClick={() => toggleColorScheme()}>New Member</Button>
                        <Table highlightOnHover sx={{ minWidth: 800, maxHeight: "1px" }} verticalSpacing="xs">
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Books Issued</th>
                                    <th>Debt</th>
                                    <th>Member since</th>
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