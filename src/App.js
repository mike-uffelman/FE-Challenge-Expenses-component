import './App.css';
import {useEffect, useState} from 'react'
import { fetchAccount } from './api/api';
import AccountSummary from "./components/AccountSummary";
import AccountSpending from './components/AccountSpending';

function App() {
    const [accountData, setAccountData] = useState(null);

    useEffect(() => {
        // fetch account transactions for app rendering
        const fetchAccountData = async () => {
            const data = await fetchAccount();
            setAccountData(data);
        }
        fetchAccountData();
    }, [])

    return (
        <article className='app' >
            <section className='account__container'>
                {accountData ? <AccountSummary data={accountData}/> : undefined}   
                {accountData ? <AccountSpending data={accountData}/> : undefined}
            </section>
            
        </article>
        
    )
}

export default App;