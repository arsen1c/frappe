import { useState } from 'react';
import { ActionIcon, Group, Navbar } from '@mantine/core';
import {
    IconUser,
    IconHome,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBook2,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
import AccountMenu from '../Elements/Menu/AccountMenu';
import { useStyles } from './style';
import { ThemeToggleButton } from '../Elements/ThemeToggle/ThemeToggleButton';


const data = [
    { link: '/', label: 'Home', icon: IconHome },
    { link: '/members', label: 'Members', icon: IconUser },
    { link: '/books', label: 'Books', icon: IconBook2 }
];

export default function NavbrarExample() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Home');

    const links = data.map((item) => (
        <Link
            to={item.link}
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            onClick={() => {
                setActive(item.label);
            }}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <Navbar height={700} width={{ sm: 300 }} p="md">
            <Navbar.Section grow>
                {links}
                <ThemeToggleButton />
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <AccountMenu />
                <Group>
                    <ActionIcon size="lg" component='a' href='http://www.github.com/arsen1c'>
                        <IconBrandGithub size={40} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" component='a' href='http://www.linkedin.com/in/aashish-gajadhane'>
                        <IconBrandLinkedin href='www.youtube.com' size={40} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Navbar.Section>
        </Navbar>
    );
}