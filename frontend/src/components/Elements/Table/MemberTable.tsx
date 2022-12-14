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
    Tooltip,
} from '@mantine/core';
import { IconCurrencyRupee, IconEdit, IconTrash, IconUserPlus } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { IMember } from '../../../interfaces/Member.interface';
import { infoData } from '../Member/MemberInfoCard';
import { MemberInfoICard } from '../Member/MemberInfoCard';
import MemberModal from '../Modals/MemberModal';
import NewMemberModal from '../Modals/NewMemberModal';
import DeleteUserModal from '../Modals/DeleteUserModal';
import { useMembersStore } from '../../../context/MembersContext';

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
    const [newMemberModal, setNewMemberModal] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState({ open: false, userId: "" });
    const [userSelected, setUserSelected] = useState("");

    const { members, newMember, removeMember, fetchMembers, error, loading } = useMembersStore();

    useEffect(() => {
        fetchMembers();
    }, [memberModalOpen]);

    const rows = members && members.map((member: IMember) => (
        <tr key={member._id}>
            <td>
                <Text color={theme.black} size="sm" tt="capitalize" weight={500}>
                    <MemberInfoICard {...infoData({ title: member.username, name: member.name })} />
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
                <Group spacing={0} color="blue" position="left">
                    <Tooltip label="Edit" withArrow color={theme.colors.blue[4]}>
                        <ActionIcon onClick={() => setMemberModalOpen({ open: true, member })}>
                            <IconEdit size={16} stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete" withArrow color={theme.colors.blue[4]}>
                        <ActionIcon color="red">
                            <IconTrash onClick={() => {
                                setUserSelected(member.username);
                                setDeleteModalOpen({ open: true, userId: member._id });
                            }
                            } size={16} stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
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
                <Tooltip label="New member" color={theme.colors.blue[4]} withArrow>
                    <ActionIcon color="blue" sx={{ alignSelf: "end" }} onClick={() => setNewMemberModal(true)}>
                        <IconUserPlus stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Group>
            <Modal title="Edit member" opened={memberModalOpen.open} onClose={() => setMemberModalOpen({ open: false, member: memberFormInitialValues })}><MemberModal member={memberModalOpen.member} /></Modal>
            <Modal title="Create a new Member" opened={newMemberModal} onClose={() => setNewMemberModal(false)}><NewMemberModal newMember={newMember} setNewMemberModal={setNewMemberModal} /></Modal>
            <Modal title={`Delete user ${userSelected}`} opened={deleteModalOpen.open} onClose={() => setDeleteModalOpen({ open: false, userId: "" })}><DeleteUserModal userId={deleteModalOpen.userId} removeMember={removeMember} setDeleteModalOpen={setDeleteModalOpen} /></Modal>
            <ScrollArea>
                {loading && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>}
                {error && <Center my={20}><Text color={"red"}>Couldn't fetch members: {error.message}</Text></Center>}
                {(members && !loading) &&
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
        </div >
    );
}