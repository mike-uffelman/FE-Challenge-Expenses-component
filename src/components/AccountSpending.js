import './AccountSpending.css';
import {useState, useEffect} from 'react';
import SpendingGraph from "./SpendingGraph";
import SpendingSummary from "./SpendingSummary";
import { filterSortData, buildGraphData } from '../helpers/Helpers';

function AccountSpending({data}) {
    const [endDate, setEndDate] = useState(new Date(Date.now()))
    const [rangeData, setRangeData] = useState(undefined);
    const [periodData, setPeriodData] = useState(undefined);
    // const [startDate, setStartDate] = useState(null)
    const [filterDays, setFilterDays] = useState(7)

    useEffect(() => {
        // console.log(data)
        // const cleanedData = filterSortData(data, endDate, filterDays);
        const graphDataBuild = buildGraphData(data, endDate, null, filterDays)
        console.log('graphdatabuild -----------------------', graphDataBuild)
        setRangeData(graphDataBuild);

        // const graphAndSummaryData = buildGraphData(data, endDate, null, filterDays*2)
        // console.log(graphAndSummaryData);

        // const startingDateTest = buildGraphData(data, endDate, "2023-01-01T00:00:00")
        // const previousPeriod = 
        // console.log(endDate)

        const spendSummaryData = buildGraphData(data, endDate, null, filterDays*2 )
        
        setPeriodData(spendSummaryData);
    }, [])


    return (
        <section className='spending__container'>
            {rangeData ? <SpendingGraph data={rangeData}/> : undefined}
            {rangeData ? <SpendingSummary data={periodData}/> : undefined}
        </section>
    )
}

export default AccountSpending;