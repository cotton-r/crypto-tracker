import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import numeral from 'numeral';

import './LineChart.css';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';
import { currencies } from '../currencyList';

const { Title } = Typography;

const LineChart = ({ userCurrency, coinHistory, currentPrice, coinName }) => {

    const coinPrice = [];
    const coinTimeStamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i]?.price)
        coinTimeStamp.push(new Date(coinHistory?.data?.history[i]?.timestamp).toLocaleDateString());
    };

    const currencySymbol = currencies[userCurrency];

    let price = Number(currentPrice);
    let cryptoPrice = null;

    if (price < 0.000000001) {
       cryptoPrice = numeral(currentPrice).format('0,0.00000000000');
    } else if (price < 0.0000001) {
        cryptoPrice = numeral(currentPrice).format('0,0.000000000');
    } else if (price < 0.00001) {
        cryptoPrice = numeral(currentPrice).format('0,0.0000000');
    } else if (price < 0.001) {
        cryptoPrice = numeral(currentPrice).format('0,0.000000');
    } else if (price < 1) {
        cryptoPrice = numeral(currentPrice).format('0,0.0000');
    } else if (price < 10) {
        cryptoPrice = numeral(currentPrice).format('0,0.0000');
    } else if (price > 10) {
        cryptoPrice = numeral(currentPrice).format('0,0.00');
    } else {
        cryptoPrice = currentPrice;
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: '',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
                lineTension: 0.1,
                pointRadius: 1,
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {   
                ticks: {
                    beginAtZero: true,
                },
                title: {
                    display: true,
                    text: `Price in ${userCurrency}`,
                }
            },
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    maxRotation: 0,
                    minRotation: 0,
                },
                grid: {
                    display: false,
                },
            }
        }
    };

    return (
        <div className='chart-wrapper'>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
                    <Title level={5} className='current-change'>Current {coinName} Price: {currencySymbol}{cryptoPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart;
