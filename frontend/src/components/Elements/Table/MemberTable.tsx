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
    Tooltip,
} from '@mantine/core';
import { IconCurrencyRupee, IconDots, IconEdit, IconPencil, IconTrash, IconUserPlus } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { IMember } from '../../../interfaces/Member.interface';
import { infoData } from '../Member/MemberInfoCard';
import { MemberInfoICard } from '../Member/MemberInfoCard';
import MemberModal from '../Modals/MemberModal';
import useSWRMutation from "swr/mutation";
import userSWR from "swr";
import { getRequest } from '../../../utils/AxiosInstance';
import NewMemberModal from '../Modals/NewMemberModal';

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


const fetcher = (endpoint: string): Promise<IMember[]> => getRequest<IMember[]>(endpoint).then(({ data }: { data: IMember[] }) => data);

export default function MembersTable() {
    const theme = useMantineTheme();
    const [memberModalOpen, setMemberModalOpen] = useState<IMemberModal>({ open: false, member: memberFormInitialValues });
    const [newMemberModal, setNewMemberModal] = useState(false);

    const { data, error, isLoading, mutate } = userSWR<IMember[]>("/user/all", fetcher);

    useEffect(() => {
        mutate();
    }, [memberModalOpen])

    const rows = data && data.map((member: IMember) => (
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
                                // setDeleteModal({ opened: true, issueId: item._id });
                                // setIssueIdSelected(item._id);
                                // setUserIdSelected(item.userId.id);
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
                {/* <Button sx={{ alignSelf: "end" }} onClick={() => setNewMemberModal(true)}></Button> */}
                <Tooltip label="New member" color={theme.colors.blue[4]} withArrow>
                    <ActionIcon color="blue" sx={{ alignSelf: "end" }} onClick={() => setNewMemberModal(true)}>
                        <IconUserPlus stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Group>
            <Modal title="Edit member" opened={memberModalOpen.open} onClose={() => setMemberModalOpen({ open: false, member: memberFormInitialValues })}><MemberModal member={memberModalOpen.member} /></Modal>
            <Modal title="Create a new Member" opened={newMemberModal} onClose={() => setNewMemberModal(false)}><NewMemberModal /></Modal>
            <ScrollArea>
                {isLoading && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>}
                {error && <Center my={20}><Text color={"red"}>Couldn't fetch members: {error.message}</Text></Center>}
                {(data && !isLoading) &&
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