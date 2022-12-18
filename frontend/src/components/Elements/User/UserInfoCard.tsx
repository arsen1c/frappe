import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt, IconBook, IconCoinRupee } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

interface UserInfoIconsProps {
    avatar: string;
    name: string;
    title: string;
    phone: string;
    email: string;
}

export function UserInfoICard({ avatar, name, title, phone, email }: UserInfoIconsProps) {
    const { classes } = useStyles();
    return (
        <div>
            <Group noWrap>
                <Avatar src={avatar} size={94} radius="md" />
                <div>

                    <Text size="lg" weight={500} className={classes.name}>
                        {name}
                    </Text>

                    <Group noWrap spacing={10} mt={3}>
                        <IconBook stroke={1.5} size={16} className={classes.icon} />
                        <Text size="xs" color="dimmed">
                            {email}
                        </Text>
                    </Group>

                    <Group noWrap spacing={10} mt={5}>
                        <IconCoinRupee stroke={1.5} size={16} className={classes.icon} />
                        <Text size="xs" color="dimmed">
                            {phone}
                        </Text>
                    </Group>
                </div>
            </Group>
        </div>
    );
}