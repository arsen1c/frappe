import { Alert, Button } from '@mantine/core';
import { deleteRequest } from '../../../utils/AxiosInstance';
import { errorToast, successToast } from '../../../utils/ToastNotifications';
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

    const sendDeleteRequest = async () => {
        setLoading(true);
        return deleteRequest("/user/issue", {
            data: {
                issueid: issueId,
                userid: userId,
            }
        }).then(res => {
            removeIssue(issueId);
            setLoading(false);
            setData(true);
            successToast("Issue removed!");
        }).catch(error => {
            const errorMsg = error.response.data.message ? error.response.data.message : error.message;
            errorToast(errorMsg);
            setLoading(false);
        })
    }

    return (
        <div>
            <Alert my={10} icon={<IconAlertCircle size={16} />} color="red">
                Return costs {<IconCurrencyRupee size={13} />}50.
            </Alert>
            <Button disabled={data} loading={loading} onClick={() => sendDeleteRequest()} color="red">Return</Button>
        </div>
    )
}

export default ReturnBookModal