import './AccountSpending.css';
import {useState, useEffect} from 'react';
import SpendingGraph from "./SpendingGraph";
import SpendingSummary from "./SpendingSummary";
import SpendingForm from './SpendingForm';
import { filterSortData, buildGraphData, fixTimeZone } from '../helpers/Helpers';

function AccountSpending({data}) {
    const [endDate, setEndDate] = useState(fixTimeZone(new Date(Date.now())))
    const [startDate, setStartDate] = useState(
        fixTimeZone(new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() - (7 - 1))))
    );
    const [currentPeriodData, setCurrentPeriodData] = useState(undefined);
    const [priorPeriodData, setPriorPeriodData] = useState(undefined);

    useEffect(() => {
        console.log(startDate, endDate)
        const graphDataBuild = buildGraphData(data, endDate, startDate)

        setCurrentPeriodData(Object.values(graphDataBuild).slice(Object.values(graphDataBuild).length / 2));
        setPriorPeriodData(Object.values(graphDataBuild).slice(0, Object.values(graphDataBuild).length / 2));

    }, [endDate, startDate])

    const submitForm = (start, end) => {
        console.log(startDate, endDate)
        console.log(start, end)
        console.log(fixTimeZone(new Date(start+'T00:00:00')), fixTimeZone(new Date(end+'T00:00:00')))
        setStartDate(fixTimeZone(new Date(start+'T00:00:00')))
        setEndDate(fixTimeZone(new Date(end+'T00:00:00')))
        
    }

    return (
        <section className='spending__container'>
            {!startDate || !endDate ? undefined : <SpendingForm startDate={startDate} endDate={endDate} onSubmit={submitForm}/> }
            {currentPeriodData ? <SpendingGraph currentData={currentPeriodData} priorData={priorPeriodData}/> : undefined}
            {currentPeriodData ? <SpendingSummary currentData={currentPeriodData} priorData={priorPeriodData}/> : undefined}
        </section>
    )
}

export default AccountSpending;