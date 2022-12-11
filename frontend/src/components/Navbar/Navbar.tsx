import { useState } from 'react';
import { Navbar } from '@mantine/core';
import {
    IconUser,
    IconHome,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
import AccountMenu from '../Elements/Menu/AccountMenu';
import { useStyles } from './style';


const data = [
    { link: '/', label: 'Home', icon: IconHome },
    { link: '/user', label: 'User', icon: IconUser }
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
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <AccountMenu />
            </Navbar.Section>
        </Navbar>
    );
}