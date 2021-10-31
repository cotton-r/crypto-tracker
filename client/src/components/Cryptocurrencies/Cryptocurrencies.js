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
                                <p>Price: {currency.price > 10 ? numeral(currency.price).format('$0,0.00') : currency.price}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {currency.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Cryptocurrencies;
