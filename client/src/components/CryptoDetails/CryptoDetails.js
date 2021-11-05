import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import numeral from 'numeral';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { currencies } from '../currencyList';

import './CryptoDetails.css';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import LineChart from '../LineChart/LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = ({ userCurrency }) => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    const cryptoDetails = data?.data?.coin;

    console.log(data)


    const time = ['24h', '7d', '30d', '1y', '5y'];

    const currencySymbol = currencies[userCurrency];

    if (isFetching) return 'Loading...';

    let price = Number(cryptoDetails?.price);
    let cryptoPrice = null;

    if (price < 0.000000001) {
       cryptoPrice = numeral(cryptoDetails?.price).format('0,0.00000000000');
    } else if (price < 0.0000001) {
        cryptoPrice = numeral(cryptoDetails?.price).format('0,0.000000000');
    } else if (price < 0.00001) {
        cryptoPrice = numeral(cryptoDetails?.price).format('0,0.0000000');
    } else if (price < 0.001) {
        cryptoPrice = numeral(cryptoDetails?.price).format('0,0.000000');
    } else if (price < 1) {
        cryptoPrice = numeral(cryptoDetails?.price).format('0,0.0000');
    } else if (price < 10) {
        cryptoPrice = numeral(cryptoDetails?.price).format('0,0.0000');
    } else if (price > 10) {
        cryptoPrice = numeral(cryptoDetails?.price).format('0,0.00');
    } else {
        cryptoPrice = cryptoDetails?.price;
    }

    let allTimeHighPrice = null;

    if (price < 0.000000001) {
        allTimeHighPrice = numeral(cryptoDetails?.allTimeHigh?.price).format('0,0.00000000000');
    } else if (price < 0.0000001) {
        allTimeHighPrice = numeral(cryptoDetails?.allTimeHigh?.price).format('0,0.000000000');
    } else if (price < 0.00001) {
        allTimeHighPrice = numeral(cryptoDetails?.allTimeHigh?.price).format('0,0.0000000');
    } else if (price < 0.001) {
        allTimeHighPrice = numeral(cryptoDetails?.allTimeHigh?.price).format('0,0.000000');
    } else if (price < 1) {
        allTimeHighPrice = numeral(cryptoDetails?.allTimeHigh?.price).format('0,0.0000');
    } else if (price < 10) {
        allTimeHighPrice = numeral(cryptoDetails?.allTimeHigh?.price).format('0,0.0000');
    } else if (price > 10) {
        allTimeHighPrice = numeral(cryptoDetails?.allTimeHigh?.price).format('0,0.00');
    } else {
        allTimeHighPrice = cryptoDetails?.allTimeHigh?.price;
    }

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoPrice}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${allTimeHighPrice}`, icon: <TrophyOutlined /> },
      ];
    
      const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
      ];

    return (
        <div className='page-container details-page'>
            <Col className='coin-detail-container'>
                <Col className='coin-heading-container'>
                    <Title level={1} className='coin-name'>
                        {cryptoDetails?.name} ({cryptoDetails?.slug})
                    </Title>
                    <p>
                        {cryptoDetails?.name} live price in {userCurrency}.
                        View statistics, market cap and supply.
                    </p>
                </Col>
                <div className='select-timeperiod-container'>
                    <Select 
                        defaultValue='7d' 
                        className='select-button select-timeperiod' 
                        dropdownClassName='select-button-dropdown'
                        placeholder='Select Time Period'
                        onChange={(value) => setTimePeriod(value)}
                    >
                        {time.map((date) => <Option key={date} className='select-option'>{date}</Option>)}
                    </Select>
                </div>
                <LineChart userCurrency={userCurrency} coinHistory={coinHistory} currentPrice={cryptoDetails?.price} coinName={cryptoDetails?.name} />
                <div className='stats-desc-container'>
                    <Col className='stats-container'>
                        <Col className='coin-value-statistics'>
                            <Col className='coin-value-statistics-heading'>
                                <Title level={2} className='coin-details-heading'>
                                    {cryptoDetails?.name} Statistics
                                </Title>
                                <p>
                                    An overview showing the statistics of {cryptoDetails?.name}.
                                </p>
                            </Col>
                            <div classNam='stats-holder'>
                                {stats.map(({ icon, title, value }) => (
                                    <Col className='coin-stats'>
                                        <Col className='coin-stats-name'>
                                            <Text className='stats-icon'>{icon}</Text>
                                            <Text>{title}</Text>
                                        </Col>
                                        <Text className='stats'>{value}</Text>
                                    </Col>
                                ))}
                            </div>
                        </Col>
                        <Col className='coin-links'>
                            <Title level={2} className='coin-details-heading'>
                                {cryptoDetails?.name} Links
                            </Title>
                            {cryptoDetails?.links.map((link) => (
                                <Row className='coin-link' key={link?.name}>
                                    <Title level={5} className='link-name'>
                                        {link?.type}
                                    </Title>
                                    <a href={link?.url} target='_blank' rel='noreferrer'>
                                        {link?.name}
                                    </a>
                                </Row>
                            ))}
                        </Col>
                    </Col>
                    <Col className='coin-desc-link'>
                        <Row className='coin-desc'>
                            <Title level={2} className='coin-details-heading'>
                                What is {cryptoDetails?.name}?
                            </Title>
                            {HTMLReactParser(cryptoDetails?.description)}
                        </Row>
                    </Col>
                </div>
            </Col>
        </div>
    )
}

export default CryptoDetails;
