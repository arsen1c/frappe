import IssuesTable from '../Elements/Table/Table'
import Stats, { StatsRingProps } from "../Elements/Stats/Stats";
import { IIssue, useFetch } from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useState } from 'react';

function Home() {

    return (
        <div>
            <IssuesTable />
        </div>
    )
}

export default Home