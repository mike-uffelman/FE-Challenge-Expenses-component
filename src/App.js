import './App.css';
import {useEffect, useState} from 'react'
import { fetchAccount } from './api/api';
import AccountSummary from "./components/AccountSummary";

function App() {
    const [accountData, setAccountData] = useState(null)

    useEffect(() => {
        const doit = async () => {
            const data = await fetchAccount();
            console.log(data)
            setAccountData(data);
        }
        doit();
        // setAccountData(data);
    }, [])

    return (
        <article className='app' >
            {accountData ? <AccountSummary data={accountData}/> : undefined}   
        </article>
        
    )
}

export default App;