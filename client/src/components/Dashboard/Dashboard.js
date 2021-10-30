import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../../services/cryptoApi';

const { Title } = Typography;

const Dashboard = () => {
    return (
        <div className='page-container'>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title='Total Cryptocurrenices' value='5' /></Col>
                <Col span={12}><Statistic title='Total Exchanges' value='5' /></Col>
                <Col span={12}><Statistic title='Total Market Cap' value='5' /></Col>
                <Col span={12}><Statistic title='Total Total 24hr Volume' value='5' /></Col>
                <Col span={12}><Statistic title='Total Markets' value='5' /></Col>
            </Row>
        </div>
    )
};

export default Dashboard;