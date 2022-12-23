import { Alert, Button, Center, Text } from '@mantine/core';
import React from 'react'
import { deleteRequest } from '../../../utils/AxiosInstance';
import useSWRMutation from "swr/mutation";
import { successToast } from '../../../utils/ToastNotifications';
import { IconAlertCircle, IconCurrencyRupee } from '@tabler/icons';

interface PropType {
    issueId: string;
    userId: string;
}

const sendDeleteRequest = async (endpoint: string, ...args: any) => {
    console.log("Args:", ...args);


    return deleteRequest(endpoint, {


        data: {
            issueid: args[0].arg.issueId,
            userid: args[0].arg.userId,
        }
    }).then(res => true)
}

function ReturnBookModal({ issueId, userId }: PropType) {
    const { trigger, data, error, isMutating } = useSWRMutation("/user/issue", sendDeleteRequest)

    if (data) {
        successToast("Book returned");
        // handleModal(false, "");
    }

    return (
        <div>
            {error && <Center my={20} color="red"><Text color={"red"}>{error.message}</Text></Center>}
            <Alert my={10} icon={<IconAlertCircle size={16} />} title="Note" color="red">
                This return costs  {<IconCurrencyRupee size={13} />}50.
            </Alert>
            <Button disabled={data} loading={isMutating} onClick={() => trigger({ issueId, userId })} color="red">Return</Button>
        </div>
    )
}

export default ReturnBookModal