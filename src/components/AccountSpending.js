import './AccountSpending.css';
import {useState, useEffect} from 'react';
import SpendingGraph from "./SpendingGraph";
import SpendingSummary from "./SpendingSummary";
import SpendingForm from './SpendingForm';
import { filterSortData, buildGraphData, fixTimeZone } from '../helpers/Helpers';

function AccountSpending({data}) {
    const [endDate, setEndDate] = useState(fixTimeZone(new Date(Date.now())))
    const [rangeData, setRangeData] = useState(undefined);
    const [periodData, setPeriodData] = useState(undefined);
    const [startDate, setStartDate] = useState(
        fixTimeZone(new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() - (7 - 1))))
    );

    useEffect(() => {
        // console.log(fixTimeZone(new Date(Date.now)))
        // console.log(fixTimeZone(new Date(Date.now())))
        console.log(startDate, endDate)
        // console.log(data)
        // const cleanedData = filterSortData(data, endDate, filterDays);
        const graphDataBuild = buildGraphData(data, endDate, startDate)
        console.log('graphdatabuild -----------------------', graphDataBuild)
        setRangeData(graphDataBuild);

        // const graphAndSummaryData = buildGraphData(data, endDate, null, filterDays*2)
        // console.log(graphAndSummaryData);

        // const startingDateTest = buildGraphData(data, endDate, "2023-01-01T00:00:00")
        // const previousPeriod = 
        // console.log(endDate)

        // const spendSummaryData = buildGraphData(data, endDate, null, filterDays*2 )
        
        // setPeriodData(spendSummaryData);

        getPreviousPeriod()
    }, [endDate, startDate])

    const getPreviousPeriod = (startDate) => {
        // console.log(startDate)
    }

    const submitForm = (start, end) => {
        console.log(start, end)
        console.log(fixTimeZone(new Date(start+'T00:00:00')), fixTimeZone(new Date(end+'T00:00:00')))
        setStartDate(fixTimeZone(new Date(start+'T00:00:00')))
        setEndDate(fixTimeZone(new Date(end+'T00:00:00')))
        
    }

    return (
        <section className='spending__container'>
            {!startDate || !endDate ? undefined : <SpendingForm startDate={startDate} endDate={endDate} onSubmit={submitForm}/> }
            {rangeData ? <SpendingGraph data={rangeData}/> : undefined}
            {/* {rangeData ? <SpendingSummary data={periodData}/> : undefined} */}
        </section>
    )
}

export default AccountSpending;