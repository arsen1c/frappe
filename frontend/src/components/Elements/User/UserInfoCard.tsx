import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt, IconBook, IconCoinRupee, IconUser } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[4]
    },
}));

export interface userInfoProps {
    title: string;
    name: string;
}

export const infoData = ({ title, name }: userInfoProps) => {
    return {
        title,
        name,
    }
}

export function UserInfoICard({ name, title }: userInfoProps) {
    const { classes } = useStyles();
    return (
        <div>
            <Group noWrap>
                <Avatar src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"} size={54} radius="md" />
                <div>

                    <Text size="sm" weight={500} className={classes.name}>
                        {name}
                    </Text>

                    <Group noWrap spacing={10} mt={3}>
                        <IconUser stroke={1.5} size={16} className={classes.icon} />
                        <Text size="xs" color="dimmed">
                            {title}
                        </Text>
                    </Group>
                </div>
            </Group>
        </div>
    );
}