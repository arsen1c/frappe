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
} from '@mantine/core';
import { IconCheck, IconPencil, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { IIssue, useFetch } from '../../../hooks/useFetch';
import { deleteRequest } from '../../../utils/AxiosInstance';



function ModalContent({ issueId }: { issueId: string }) {
    return (
        <Button color={"red"} >Delete</Button>
    )
}

export default function IssuesTable() {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const { data, error, isPending } = useFetch("/issue/all");
    const [deleteModal, setDeleteModal] = useState({ opened: false, issueId: "" });
    const [issueIdSelected, setIssueIdSelected] = useState("");
    const [userIdSelected, setUserIdSelected] = useState("");
    const [editModalOpened, setEditModalOpened] = useState(false);

    const [issues, setIssues] = useState<IIssue[]>([]);

    function deleteIssue(issueId: string, userId: string) {
        deleteRequest("/user/issue", {
            data: {
                issueid: issueId,
                userid: userId
            }
        }).then(res => {
            const newIssues = issues.filter(issue => issue._id !== issueId);
            setIssues([...newIssues]);
        }).catch(err => {
            console.log(err);
            // error =  

        })
    }

    const rows = data && data.map((item: IIssue) => (
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
                <Anchor<'a'> size="sm" weight={800} href={`/user/${item.userId.username}`}>
                    {item.userId.username}
                </Anchor>
            </td>
            <td>
                <Text size="sm">{item.bookInfo.title}</Text>
            </td>
            <td>
                <Text size="sm" color="dimmed">
                    {String(new Date(item.bookInfo.returnDate).toLocaleDateString())}
                </Text>
            </td>
            <td>
                <Group spacing={0} position="right">
                    <ActionIcon>
                        <IconPencil size={16} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon color="red">
                        <IconTrash onClick={() => {
                            setDeleteModal({ opened: true, issueId: item._id })
                            setIssueIdSelected(item._id);
                            setUserIdSelected(item.userId.id);
                        }
                        } size={16} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea my={50}>
            <Title>Ongoing issues</Title>
            {isPending && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>}
            {error && <Text color={"red"}>Couldn't fetch issues: {error}</Text>}
            {(data && !isPending) &&
                <Center style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <Modal centered opened={deleteModal.opened} withCloseButton={true} title={`Delete issue ${deleteModal.issueId}`} size="auto" onClose={() => setDeleteModal({ opened: false, issueId: "" })}>{
                        <Button color={"red"} onClick={() => deleteIssue(issueIdSelected, userIdSelected)}>Delete</Button>
                    }</Modal>
                    <Button onClick={() => toggleColorScheme()}>New Issue</Button>
                    <Table highlightOnHover sx={{ minWidth: 800, maxHeight: "1px" }} verticalSpacing="xs">
                        <thead>
                            <tr>
                                <th>BookID</th>
                                <th>IssueID</th>
                                <th>Member</th>
                                <th>Title</th>
                                <th>Return Date</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Center>
            }
        </ScrollArea>
    );
}