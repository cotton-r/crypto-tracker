import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { currencies } from '../currencyList';

import './Dashboard.css';
import Favourites from './Favourites/Favourites';

import { useGetCryptoStatsQuery } from '../../services/cryptoApi';

const { Title } = Typography;

const Dashboard = ({userCurrency}) => {

    // global stats api call
    const { data, isFetching } = useGetCryptoStatsQuery();
    const globalStats = data?.data

    // chart
    const [timePeriod, setTimePeriod] = useState('7d');

    const currencySymbol = currencies[userCurrency];

    if (isFetching) return 'Loading...';

    console.log(globalStats);

    return (
        <div className='page-container dashboard-page'>
            <div className='global-stats-tile'>
                <Title level={2} className='global-stats-heading'>Global Crypto Stats</Title>
                <Row>
                    <Col span={12}><Statistic title='Total Cryptocurrenices' value={globalStats.active_cryptocurrencies} /></Col>
                    <Col span={12}><Statistic title='Total Exchanges' value={globalStats.markets} /></Col>
                    <Col span={12}><Statistic title='Total Market Cap' value={currencySymbol + ' ' + millify(globalStats.total_market_cap.gbp)} /></Col>
                </Row>
            </div>
            <div className='favourite-coins-container'>
                {/* <Favourites userCurrency={userCurrency} /> */}
            </div>
        </div>
    )
};

export default Dashboard;