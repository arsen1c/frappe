import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Group,
} from '@mantine/core';
import MainNavbar from '../Navbar/Navbar';
import { IconBooks } from '@tabler/icons';

interface PropType {
    children: JSX.Element | JSX.Element[];
}

export default function AppShellExample({ children, ...props }: PropType) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    // background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? "white" : "black"
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="lg" hidden={!opened} width={{ lg: 300 }}>
                    {/* <Text>Application navbar</Text> */}
                    <MainNavbar />
                </Navbar>
            }
            header={
                <Header height={{ base: 70, md: 70 }} p="md">
                    <div style={{ display: "flex", height: '100%' }}>
                        <MediaQuery largerThan="lg" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <Group>
                            <IconBooks size={35} />
                            <Text weight={"bold"} size={25}>Frapbrary</Text>
                        </Group>
                    </div>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
}