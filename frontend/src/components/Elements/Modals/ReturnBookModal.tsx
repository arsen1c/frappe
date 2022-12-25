import { Alert, Button, Center, Text } from '@mantine/core';
import { deleteRequest } from '../../../utils/AxiosInstance';
import { successToast } from '../../../utils/ToastNotifications';
import { IconAlertCircle, IconCurrencyRupee } from '@tabler/icons';
import { useState } from 'react';

interface PropType {
    issueId: string;
    userId: string;
    removeIssue: (issueId: string) => void;
}

function ReturnBookModal({ issueId, userId, removeIssue }: PropType) {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const sendDeleteRequest = async () => {
        return deleteRequest("/user/issue", {
            data: {
                issueid: issueId,
                userid: userId,
            }
        }).then(res => {
            setLoading(false);
            removeIssue(issueId);
            setData(true);
            successToast("Issue removed!");
        }).catch(error => {
            setError(error.message);
        })
    }

    return (
        <div>
            {error && <Center my={20} color="red"><Text color={"red"}>{error}</Text></Center>}
            <Alert my={10} icon={<IconAlertCircle size={16} />} color="red">
                Return costs {<IconCurrencyRupee size={13} />}50.
            </Alert>
            <Button disabled={data} loading={loading} onClick={() => sendDeleteRequest()} color="red">Return</Button>
        </div>
    )
}

export default ReturnBookModal