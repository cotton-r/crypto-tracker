import React, { useState, useEffect, useReducer } from 'react';
import { Spin, Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import StackGrid from "react-stack-grid";

import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../../services/cryptoApi';

import './News.css';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ userCurrency }) => {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: 12});
    const { data } = useGetCryptosQuery(userCurrency);

    const handleNewsChange = (value) => {
        setNewsCategory(value);
        forceUpdate();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            forceUpdate();
        }, 400);
        return () => clearTimeout(timer);
      }, [newsCategory]);

    return (
        <div className='page-container news-page'>
            {!cryptoNews?.value
                ? ''
                :
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-button news-select-button'
                        dropdownClassName='select-button-dropdown news-dropdown'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={(value) => handleNewsChange(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value='Cryptocurrency' className='select-option'>All Cryptocurrencies</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name} className='select-option'>{coin.name}</Option>)}
                    </Select>
                </Col>
            }
            {!cryptoNews?.value
                ? <div className='loading-news'><Spin size='large' /></div>
                :
                <StackGrid 
                    columnWidth={300} 
                    className='news-container'
                    monitorImagesLoaded={true}
                    gutterWidth={30}
                    gutterHeight={10}
                >
                    {cryptoNews.value.map((news, i) => (
                        <Col xs={24} sm={12} lg={8} key={i}>
                            <Card hoverable className='news-card'>
                                <a href={news.url} target='_blank' rel='noreferrer'>
                                    <div className='news-image-container'>
                                        <Title className='news-title' level={5}>{news.name}</Title>
                                        <img style={{ maxWidth: '200px', maxHeight: '100px' }}src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                                    </div>
                                    <p>
                                        {news.description > 100 
                                            ? `${news.description.substring(0, 100)}...`
                                            : news.description
                                        }
                                    </p>
                                    <div className='provider-container'>
                                        <div>
                                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                                            <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                        </div>
                                        <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                    </div>
                                </a>
                            </Card>
                        </Col>
                    ))}
                </StackGrid>
            }
        </div>
    )
};

export default News;
