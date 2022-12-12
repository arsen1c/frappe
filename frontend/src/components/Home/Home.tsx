import IssuesTable from '../Elements/Table/Table'
import Stats, { StatsRingProps } from "../Elements/Stats/Stats";
import { IIssue, useFetch } from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useState } from 'react';

const statsData: StatsRingProps = {
    data: [
        {
            "label": "Page views",
            "stats": "456,578",
            "progress": 65,
            "color": "teal",
            "icon": "up"
        },
        {
            "label": "New users",
            "stats": "2,550",
            "progress": 72,
            "color": "blue",
            "icon": "up"
        },
        {
            "label": "Orders",
            "stats": "4,735",
            "progress": 52,
            "color": "red",
            "icon": "down"
        }
    ]
}
function Home() {

    return (
        <div>
            <Stats data={statsData.data} />
            <IssuesTable />
        </div>
    )
}

export default Home