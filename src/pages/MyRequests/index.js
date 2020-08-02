import React from 'react';
import './styles.css';
import UserSidebar from '../../components/UserSidebar';
import RequestList from '../../components/RequestList';

export default function MyRequests(){
    return(
        <div>
            <RequestList />
        </div>
    )
}