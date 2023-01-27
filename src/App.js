import './App.css';
import {useEffect, useState} from 'react'
import { fetchAccount } from './api/api';
import AccountSummary from "./components/AccountSummary";
import AccountSpending from './components/AccountSpending';

function App() {
    const [accountData, setAccountData] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
        const doit = async () => {
            const data = await fetchAccount();
            console.log(data)
            setAccountData(data);
        }
        doit();

        setCurrentDate(new Date(Date.now()))
        // setAccountData(data);
    }, [])

    return (
        <article className='app' >
            {accountData ? <AccountSummary data={accountData}/> : undefined}   
            {accountData ? <AccountSpending data={accountData} today={currentDate}/> : undefined}
        </article>
        
    )
}

export default App;