import { RingProgress, Text, SimpleGrid, Paper, Center, Group, Title } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons';

export interface StatsRingProps {
    data: {
        label: string;
        stats: string;
        progress: number;
        color: string;
        icon: 'up' | 'down';
    }[];
}

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
};

export default function StatsRing({ data }: StatsRingProps) {
    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        return (
            <Paper withBorder radius="md" p="xs" shadow={"sm"} key={stat.label} >
                <Group >
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: stat.progress, color: stat.color }]}
                        label={
                            <Center>
                                <Icon size={22} stroke={1.5} />
                            </Center>
                        }
                    />

                    <div>
                        <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                            {stat.label}
                        </Text>
                        <Text weight={700} size="xl">
                            {stat.stats}
                        </Text>
                    </div>
                </Group>
            </Paper >
        );
    });
    return (
        <div>
            <Title>Stats</Title>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                {stats}
            </SimpleGrid>
        </div>
    );
}