import React from 'react';
import { Button, Menu, Typography, Avatar, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectedOutlined, BulbOutlined, DollarOutlined, MenuOutlined, LineChartOutlined } from '@ant-design/icons';

import './Navbar.css';

import icon from '../../images/crypto-icon.png';

const { Option } = Select;

const Navbar = ({userCurrency, setUserCurrency}) => {

    const handleCurrencyChange = (e) => {
        setUserCurrency(e);
    };

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large' />
            </div>
            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined />} className='nav-item'>
                    <Link to='/' className='nav-item-icon'>Dashboard</Link>
                </Menu.Item>
                <Menu.Item icon={<DollarOutlined />} className='nav-item'>
                    <Link to='/cryptocurrencies' className='nav-item-icon'>Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<LineChartOutlined />} className='nav-item'>
                    <Link to='/news' className='nav-item-icon'>News</Link>
                </Menu.Item>
            </Menu>
            <div className='currency-picker-container'>
                <Input.Group compact theme='dark'>
                    <Select 
                        defaultValue="GBP"
                        value={userCurrency}
                        onChange={(e) => handleCurrencyChange(e)}
                        dropdownClassName='currency-select-dropdown'
                        className='currency-select'
                    >
                        <Option className='currency-option' value='GBP'>GBP</Option>
                        <Option className='currency-option' value='USD'>USD</Option>
                        <Option className='currency-option' value='EUR'>EUR</Option>
                        <Option className='currency-option' value='INR'>INR</Option>
                        <Option className='currency-option' value='AUD'>AUD</Option>
                        <Option className='currency-option' value='CAD'>CAD</Option>
                        <Option className='currency-option' value='SGD'>SGD</Option>
                        <Option className='currency-option' value='CHF'>CHF</Option>
                        <Option className='currency-option' value='MYR'>MYR</Option>
                        <Option className='currency-option' value='JPY'>JPY</Option>
                        <Option className='currency-option' value='CNY'>CNY</Option>
                    </Select>
                
                </Input.Group>
            </div>
        </div>
    )
}

export default Navbar;