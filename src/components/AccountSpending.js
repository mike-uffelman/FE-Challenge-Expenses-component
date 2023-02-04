import './AccountSpending.css';
import {useState, useEffect} from 'react';
import SpendingGraph from "./SpendingGraph";
import SpendingSummary from "./SpendingSummary";
import { filterSortData, buildGraphData } from '../helpers/Helpers';

function AccountSpending({data}) {
    const [endDate, setEndDate] = useState(new Date(Date.now()))
    const [rangeData, setRangeData] = useState(undefined);
    // const [startDate, setStartDate] = useState(null)
    const [filterDays, setFilterDays] = useState(7)

    useEffect(() => {
        // console.log(data)
        // const cleanedData = filterSortData(data, endDate, filterDays);
        const graphDataBuild = buildGraphData(data, endDate, null, filterDays) 
        // console.log(graphDataBuild)
        // console.log(cleanedData);
        setRangeData(graphDataBuild);
    }, [])


    return (
        <section className='spending__container'>
            {rangeData ? <SpendingGraph data={rangeData}/> : undefined}
            {rangeData ? <SpendingSummary data={rangeData}/> : undefined}
        </section>
    )
}

export default AccountSpending;