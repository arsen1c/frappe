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
    Button,
    Notification,
    useMantineColorScheme,
    Menu,
    Modal,
} from '@mantine/core';
import { IconCurrencyRupee, IconDots, IconPencil, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { IMember } from '../../../interfaces/Member.interface';
import { infoData } from '../Member/MemberInfoCard';
import { MemberInfoICard } from '../Member/MemberInfoCard';
import MemberModal from '../Modals/MemberModal';

interface IMemberModal {
    open: boolean;
    member: IMember;
}

export const memberFormInitialValues: IMember = {
    _id: "",
    createdAt: "",
    __v: 0,
    debt: 0,
    isAdmin: false,
    name: "",
    updatedAt: "",
    username: "",
    booksIssued: [0]
}

export default function MembersTable() {
    const theme = useMantineTheme();
    const [memberModalOpen, setMemberModalOpen] = useState<IMemberModal>({ open: false, member: memberFormInitialValues });

    const { data, error, isPending } = useFetch("/user/all");

    const rows = data && data.map((member: IMember) => (
        <tr key={member._id}>
            <td>
                <Text variant='link' color={theme.black} size="sm" tt="capitalize" weight={500}>
                    <MemberInfoICard {...infoData({ title: member.isAdmin ? "Admin" : "Member", name: member.name })} />
                </Text>
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
                        <Menu.Item onClick={() => setMemberModalOpen({ open: true, member })} icon={<IconPencil size={16} stroke={1.5} />}>Edit</Menu.Item>
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
                <Title>Members</Title>
                <Button sx={{ alignSelf: "end" }} onClick={() => null}>New Member</Button>
            </Group>
            <Modal title="Edit member" opened={memberModalOpen.open} onClose={() => setMemberModalOpen({ open: false, member: memberFormInitialValues })}><MemberModal member={memberModalOpen.member} /></Modal>
            <ScrollArea>
                {isPending && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>}
                {error && <Text color={"red"}>Couldn't fetch members: {error}</Text>}
                {(data && !isPending) &&
                    <Center style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
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