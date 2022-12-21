import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

export const errorToast = (error: string) => {
    return showNotification({
        message: error,
        icon: <IconX />,
        color: "red",
    })
}

export const successToast = (message: string) => {
    return showNotification({
        message: message,
        icon: <IconCheck />,
        color: "green",
    })
}
