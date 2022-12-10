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
    ThemeIcon,
} from '@mantine/core';
import TableExample from '../Elements/Table/Table';
import MainNavbar from './Navbar';
// import Home from '../Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { IconBooks } from '@tabler/icons';
import usersData from "../../data/users.json";
import User from '../Elements/User/User';

export default function AppShellExample() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <Router>
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
                    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                        {/* <Text>Application navbar</Text> */}
                        <MainNavbar />
                    </Navbar>
                }
                header={
                    <Header height={{ base: 70, md: 70 }} p="md">
                        <div style={{ display: "flex", height: '100%' }}>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
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
                {/* <TableExample /> */}
                <Routes>
                    {/* <Route path='/' element={<Home />} /> */}
                    <Route path='/' element={<TableExample data={usersData.data} />} />
                    <Route path='/user' element={<User />} />
                </Routes>
            </AppShell>
        </Router>
    );
}