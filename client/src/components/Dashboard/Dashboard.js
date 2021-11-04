import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { currencies } from '../currencyList';

import './Dashboard.css';

import { useGetCryptosQuery } from '../../services/cryptoApi';

const { Title } = Typography;

const Dashboard = ({userCurrency}) => {

    // global stats api call
    const { data, isFetching } = useGetCryptosQuery(userCurrency);
    const globalStats = data?.data?.stats;

    // chart
    const [timePeriod, setTimePeriod] = useState('7d');

    const currencySymbol = currencies[userCurrency];

    if (isFetching) return 'Loading...';

    return (
        <div className='page-container dashboard-page'>
            <div className='global-stats-tile'>
                <Title level={2} className='global-stats-heading'>Global Crypto Stats</Title>
                <Row>
                    <Col span={12}><Statistic title='Total Cryptocurrenices' value={globalStats.total} /></Col>
                    <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /></Col>
                    <Col span={12}><Statistic title='Total Market Cap' value={currencySymbol + ' ' + millify(globalStats.totalMarketCap)} /></Col>
                    <Col span={12}><Statistic title='Total 24hr Volume' value={currencySymbol + ' ' + millify(globalStats.total24hVolume)} /></Col>
                </Row>
            </div>
        </div>
    )
};

export default Dashboard;