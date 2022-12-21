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
    useMantineColorScheme,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { IIssue } from '../../../interfaces/Issue.interface';
import { deleteRequest, getRequest } from '../../../utils/AxiosInstance';
import { IBook } from "../../../interfaces/Book.interface";
import IssueModal from '../Modals/IssueModal';
import { useIssueStore } from '../../../context/IssuesContext';
import { successToast } from '../../../utils/ToastNotifications';
interface IssueModalProps {
    isOpened: boolean;
    setIsOpened(value: boolean): void;
    userId: string;
}

interface ModalIssue {
    value: string;
    label: string;
}[]

function handleIssueSubmit(formData: { bookId: string, userId: string }) {
    console.log("Data:", formData);

}

export default function IssuesTable() {
    console.log("Rendering...");

    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    // const { data, error, isPending } = useFetch("/issue/all");
    // const {{}useIssuesContext();
    // const [data, setData] = useState<Array<IIssue>>([]);
    const { issues, newIssue, removeIssue, fetchIssues } = useIssueStore();



    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [deleteModal, setDeleteModal] = useState({ opened: false, issueId: "" });
    const [issueIdSelected, setIssueIdSelected] = useState("");
    const [userIdSelected, setUserIdSelected] = useState("");
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [issueModalOpen, setIssueModalOpen] = useState(false);

    useEffect(() => {
        fetchIssues();
    }, [deleteModal, issueModalOpen])


    function deleteIssue(issueId: string, userId: string) {
        deleteRequest("/user/issue", {
            data: {
                issueid: issueId,
                userid: userId
            }
        }).then(res => {
            // const newIssues = issues.filter(issue(issue => issue._id !== issueId)) => issue._id !== issueId);
            // newIssue([...newIssues]);
            removeIssue(issueId, userId);
            setDeleteModal({ opened: false, issueId: "" });
            successToast("Issue deleted");
        }).catch(err => {
            console.log(err);
            // error =  

        })
    }

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
                    <ActionIcon color="red">
                        <IconTrash onClick={() => {
                            setDeleteModal({ opened: true, issueId: item._id });
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
        <div>
            <Title>Ongoing issues</Title>
            <Button onClick={() => setIssueModalOpen(true)}>New issue</Button>
            <ScrollArea my={50}>
                {/* {isPending && <Center style={{ margin: 100 }}><Loader variant='dots' size={"xl"} /></Center>} */}
                {error && <Text color={"red"}>Couldn't fetch issues: {error}</Text>}
                {(issues && !isPending) &&
                    <Center style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Modal centered opened={deleteModal.opened} withCloseButton={true} title={`Delete issue ${deleteModal.issueId}`} size="auto" onClose={() => setDeleteModal({ opened: false, issueId: "" })}>{
                            <Button color={"red"} onClick={() => deleteIssue(issueIdSelected, userIdSelected)}>Delete</Button>
                        }
                        </Modal>
                        <IssueModal isOpened={issueModalOpen} setIsOpened={setIssueModalOpen} />
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