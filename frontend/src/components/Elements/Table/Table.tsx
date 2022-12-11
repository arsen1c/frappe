import { Anchor, Container, createStyles, Group, Table, Text, Title } from '@mantine/core';
import { useFetch } from '../../../hooks/useFetch';

export default function IssuesTable() {
    /* Fetch issues */
    const { data, isPending, error } = useFetch("/user/issues/6390dce6fee761514ff8eaef");
    const rows = data.map((element) => (
        <tr key={element._id}>
            <td>{element.bookInfo.bookID}</td>
            <td>
                <Anchor<'a'> size="sm" href={`/user/${element.userId.username}`} >
                    {element.userId.username}
                </Anchor>
            </td>
            <td>{element.bookInfo.title}</td>
            <td>{String(new Date(element.bookInfo.returnDate).toLocaleDateString())}</td>
        </tr>
    ));

    return (
        <div>
            {error && <Text color={"red"}>{error}</Text>}
            {isPending ?
                <Text>Loading</Text>
                :
                <Group>
                    <Title>Book Loans</Title>
                    <Table striped highlightOnHover withBorder style={{ minWidth: 600 }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Member</th>
                                <th>Title</th>
                                <th>Return Date</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table >
                </Group>
            }
        </div>

    );
}