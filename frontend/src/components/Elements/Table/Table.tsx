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
    useMantineColorScheme,
    Tooltip,
} from '@mantine/core';
import { IconBookUpload, IconFilePlus } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { IIssue } from '../../../interfaces/Issue.interface';
import { deleteRequest } from '../../../utils/AxiosInstance';
import IssueModal from '../Modals/IssueModal';
import { useIssueStore } from '../../../context/IssuesContext';
import { successToast } from '../../../utils/ToastNotifications';
import ReturnBookModal from '../Modals/ReturnBookModal';

export default function IssuesTable() {
    const theme = useMantineTheme();
    const { issues, newIssue, removeIssue, fetchIssues, error, loading } = useIssueStore();

    // const [isPending, setIsPending] = useState<boolean>(false);
    // const [error, setError] = useState<string>("");

    const [returnModal, setReturnModal] = useState({ opened: false, issueId: "" });
    const [issueIdSelected, setIssueIdSelected] = useState("");
    const [userIdSelected, setUserIdSelected] = useState("");
    const [userSelected, setUserSelected] = useState("");
    const [issueModalOpen, setIssueModalOpen] = useState(false);

    useEffect(() => {
        fetchIssues();
    }, [])

    const rows = issues && issues.map((item: IIssue) => (
        <tr key={item._id}>
            <td>
                <Text size="sm" weight={500}>
                    {item.bookInfo.bookID}
                </Text>
            </td>
            <td>
                <Text size="sm" weight={500}>
                    {item._id}
                </Text>
            </td>

            <td>
                <Anchor<'a'> size="sm" weight={800} href={`/member/${item.userId.username}`}>
                    {item.userId.username}
                </Anchor>
            </td>
            <td>
                <Text size="sm">{item.bookInfo.title}</Text>
            </td>
            <td>
                <Text size="sm" color="dimmed">
                    {String(new Date(item.bookInfo.issueDate).toLocaleDateString())}
                </Text>
            </td>
            <td>
                <Text size="sm" color="dimmed">
                    {String(new Date(item.bookInfo.returnDate).toLocaleDateString())}
                </Text>
            </td>
            <td>
                <Group spacing={0} position="left">
                    <Tooltip label="Return Book" color={theme.colors.blue[4]} withArrow>
                        <ActionIcon color="red">
                            <IconBookUpload onClick={() => {
                                setReturnModal({ opened: true, issueId: item._id });
                                setIssueIdSelected(item._id);
                                setUserIdSelected(item.userId.id);
                                setUserSelected(item.userId.username);
                            }
                            } size={20} stroke={1.5} />
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
                <Title>Ongoing issues</Title>
                <Tooltip label="New Issue" color={theme.colors.blue[4]} withArrow>
                    <ActionIcon sx={{ alignSelf: "end" }} color="blue" onClick={() => setIssueModalOpen(true)}>
                        <IconFilePlus stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Group>
            <ScrollArea my={50}>
                {error && <Text color={"red"}>Couldn't fetch issues: {error.message}</Text>}
                {(loading) && <Center><Loader variant='dots' /></Center>}
                {(issues && !loading) &&
                    <Center style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Modal centered opened={returnModal.opened} withCloseButton={true} title={`Issue return from ${userSelected}`} size="md" onClose={() => setReturnModal({ opened: false, issueId: "" })}>{
                            <ReturnBookModal issueId={issueIdSelected} userId={userIdSelected} />
                        }
                        </Modal>
                        <IssueModal isOpened={issueModalOpen} setIsOpened={setIssueModalOpen} newIssue={newIssue} />
                        <Table highlightOnHover sx={{ minWidth: 800, maxHeight: "1px" }} verticalSpacing="xs">
                            <thead>
                                <tr>
                                    <th>BookID</th>
                                    <th>IssueID</th>
                                    <th>Member</th>
                                    <th>Title</th>
                                    <th>Issue Date</th>
                                    <th>Return Date</th>
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