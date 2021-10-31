import React, { useState, useEffect } from 'react';
import millify from 'millify';
import numeral from 'numeral'
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import './Cryptocurrencies.css';

import { useGetCryptosQuery } from '../../services/cryptoApi';

const Cryptocurrencies = () => {

    const { data: cryptosList, isFetching } = useGetCryptosQuery();
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(filteredData);

    }, [cryptosList, searchTerm]);

    if (isFetching) return 'Loading...';

    let currencySymbol = '£';

    return (
        <div className='page-container crypto-page'>
            <div className='search-crypto'>
                <Input className='search-crypto-field' placeholder='Search cryptocurrencies' onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Row className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                {(() => {
                                    let price = Number(currency.price);

                                    if (price < 0.000000001) {
                                        return <p>Price: {currencySymbol}{numeral(currency.price).format('0,0.00000000000')}</p>;
                                    } else if (price < 0.0000001) {
                                        return <p>Price: {currencySymbol}{numeral(currency.price).format('0,0.000000000')}</p>;
                                    } else if (price < 0.00001) {
                                        return <p>Price: {currencySymbol}{numeral(currency.price).format('0,0.0000000')}</p>;
                                    } else if (price < 0.001) {
                                        return <p>Price: {currencySymbol}{numeral(currency.price).format('0,0.000000')}</p>;
                                    } else if (price < 1) {
                                        return <p>Price: {currencySymbol}{numeral(currency.price).format('0,0.0000')}</p>;
                                    } else if (price < 10) {
                                        return <p>Price: {currencySymbol}{numeral(currency.price).format('0,0.0000')}</p>;
                                    } else if (price > 10) {
                                        return <p>Price: {currencySymbol}{numeral(currency.price).format('0,0.00')}</p>;
                                    } else {
                                        return <p>Price: {currencySymbol}{currency.price}</p>;
                                    }
                                })()}
                                {currency.change >= 0 ? <p>Daily Change: <span className='positive-change-card'>{currency.change}%</span></p> : <p>Daily Change: <span className='negative-change-card'>{currency.change}%</span></p>}
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Cryptocurrencies;
