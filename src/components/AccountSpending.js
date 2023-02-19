import './AccountSpending.css';
import {useState, useEffect} from 'react';
import SpendingGraph from "./SpendingGraph";
import SpendingSummary from "./SpendingSummary";
import SpendingForm from './SpendingForm';
import { fixTimeZone, buildGraphData } from '../helpers/Helpers';

function AccountSpending({data}) {
    const [endDate, setEndDate] = useState(fixTimeZone(new Date(Date.now())))
    const [startDate, setStartDate] = useState(
        fixTimeZone(new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() - (7 - 1))))
    );
    const [currentPeriodData, setCurrentPeriodData] = useState(undefined);
    const [priorPeriodData, setPriorPeriodData] = useState(undefined);
    const [formOpen, setFormOpen] = useState(false);


    // on initial render and start/end date updates build the graph data arrays and assign to respective state
    useEffect(() => {
        const graphDataBuild = buildGraphData(data, endDate, startDate)

        setCurrentPeriodData(Object.values(graphDataBuild).slice(Object.values(graphDataBuild).length / 2));
        setPriorPeriodData(Object.values(graphDataBuild).slice(0, Object.values(graphDataBuild).length / 2));

    }, [data, endDate, startDate])

    // on form submit set new values for start/end
    const submitForm = (start, end) => {
        setStartDate(fixTimeZone(new Date(start+'T00:00:00')))
        setEndDate(fixTimeZone(new Date(end+'T00:00:00')))
    }

    const formBlur = formOpen ? 'blur' : '';

    return (
        <section className='spending__container'>
            {!startDate || !endDate ? undefined : <SpendingForm startDate={startDate} endDate={endDate} onSubmit={submitForm} formOpen={formOpen} setFormOpen={setFormOpen}/> }

            {currentPeriodData ? <SpendingGraph asdf={formBlur} currentData={currentPeriodData} /> : undefined}
            
            {currentPeriodData ? <SpendingSummary currentData={currentPeriodData} priorData={priorPeriodData}/> : undefined}
        </section>
    )
}

export default AccountSpending;