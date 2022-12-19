import { forwardRef } from 'react';
import { IconChevronRight, IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ThemeToggleButton } from '../ThemeToggle/ThemeToggleButton';

interface MemberButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    image: string;
    name: string;
    username: string;
    icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, MemberButtonProps>(
    ({ image, name, username, icon, ...others }: MemberButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.md,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
            {...others}
        >
            <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {username}
                    </Text>
                </div>

                {icon || <IconChevronRight size={16} />}
            </Group>
        </UnstyledButton>
    )
);

export default function AccountMenu() {
    return (
        <Group position="center">
            <Menu withArrow>
                <Menu.Target>
                    <UserButton
                        image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                        name="Arsenic Vec"
                        username="arsenic"
                    />
                </Menu.Target>
                <Menu.Dropdown my={-9}>
                    <Menu.Label>Options</Menu.Label>
                    <Link to="/user" style={{ textDecoration: "none" }}>
                        <Menu.Item icon={<IconSettings size={14} to="/settings" />}>Settings</Menu.Item>
                    </Link>
                    <Menu.Divider />
                    <Menu.Item color="red" icon={<IconTrash size={14} />}>Logout</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group >
    );
}