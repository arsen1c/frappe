import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
    useMantineColorScheme,
    Title
} from '@mantine/core';
import MainNavbar from '../Navbar/Navbar';
import LayoutProp from "../../interfaces/LayoutProps.interface";

export default function AppShellExample({ children, ...props }: LayoutProp) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <AppShell
            styles={{
                main: {
                    // background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? "white" : theme.colors.dark[4]
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
                <Header height={{ base: 70, md: 70 }} p="md" sx={{ display: "flex", alignItems: "center" }}>
                    <MediaQuery largerThan="lg" styles={{ display: 'none' }}>
                        <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="xl"
                            sx={{
                                position: "absolute",
                                right: 0,
                            }}
                        />
                    </MediaQuery>

                    <Title
                        size="h2"
                        color={"blue"}
                    >
                        Frapbrary
                    </Title>
                </Header>
            }

        >
            {children}
        </AppShell>
    );
}